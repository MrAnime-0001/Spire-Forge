# Download card art (art only, no frame) from slaythespire.wiki.gg into assets/cards/<pool>/<slug>.webp.
# Re-runnable: skips files that already exist. Needs Pillow (pip install pillow).
# Usage: python scripts/fetch-card-art.py
import io, json, re, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image

API = 'https://slaythespire.wiki.gg/api.php?'
OUT = Path(__file__).resolve().parent.parent / 'assets' / 'cards'
POOLS = ['Ironclad', 'Silent', 'Defect', 'Regent', 'Necrobinder', 'Colorless']
WIDTH = 320  # art window is ~210px wide; 320 keeps it sharp on hi-dpi screens


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'SpireForge card art sync'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def api(**params):
    return json.loads(get(API + urllib.parse.urlencode({**params, 'format': 'json'})))


def slug(name):  # must match cardArtSrc() in ui/helpers.js
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def art_files():
    """lowercased file name -> url, for every *-Art.png on the wiki."""
    files, cont = {}, {}
    while True:
        j = api(action='query', list='allimages', aiprefix='StS2_', ailimit=500, aiprop='url', **cont)
        for i in j['query']['allimages']:
            if i['name'].endswith('-Art.png'):
                files[i['name'].lower()] = i['url'].split('?')[0]
        if 'continue' not in j:
            return files
        cont = {'aicontinue': j['continue']['aicontinue']}


def cards():
    for pool in POOLS:
        lua = api(action='parse', page=f'Module:Cards/StS2_data/{pool}', prop='wikitext')['parse']['wikitext']['*']
        for name, image in re.findall(r'\["([^"]+)"\][\s\S]*?Image = "([^"]+)"', lua):
            yield pool.lower(), re.sub(r' \((Ironclad|Silent|Defect|Regent|Necrobinder)\)$', '', name), image


def fetch(job):
    dest, url = job
    thumb = url.replace('/images/', '/images/thumb/') + f'/{WIDTH}px-' + url.rsplit('/', 1)[1]
    try:
        img = Image.open(io.BytesIO(get(thumb)))
    except Exception:  # original narrower than WIDTH -> wiki has no thumb, use the full file
        img = Image.open(io.BytesIO(get(url)))
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.convert('RGBA').save(dest, 'WEBP', quality=78, method=6)


def main():
    files = art_files()
    jobs, missing = [], []
    for pool, name, image in cards():
        # Art is usually "<Image>-Art.png"; some files drop hyphens or moved pool (e.g. Clash -> Colorless).
        url = (files.get(re.sub(r'\.(png|gif)$', '-Art.png', image.replace(' ', '_')).lower())
               or files.get(f'sts2_{pool}-{re.sub(r"[^A-Za-z0-9]", "", name)}-art.png'.lower()))
        dest = OUT / pool / f'{slug(name)}.webp'
        if not url:
            missing.append(f'{pool}/{name}')
        elif not dest.exists():
            jobs.append((dest, url))
    with ThreadPoolExecutor(4) as ex:
        list(ex.map(fetch, jobs))
    print(f'downloaded {len(jobs)}, missing art for {len(missing)}: {", ".join(missing)}')


if __name__ == '__main__':
    assert slug("Banshee's Cry") == 'banshee-s-cry' and slug('GUARDS!!!') == 'guards'
    main()
