#!/usr/bin/env python3
"""
Make web copies of a folder of photos for the site.

    python3 scripts/add_images.py <source-folder> <name> [--prefix p] [--full 2800 --quality 86]

  <source-folder>  raw photos/scans (jpg, jpeg, png) — never committed
  <name>           folder under assets/img/, e.g. "bookfair", "w06-activity"

Writes assets/img/<name>/full/*.jpg (1800px by default; use --full for
finished work that should stay sharp) and thumb/*.jpg (420px),
fixes rotation, strips all metadata (incl. GPS), then prints the image
ids to paste into assets/js/data.js.

Needs Pillow:  pip install pillow
"""
import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow missing — run: pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
EXT = {".jpg", ".jpeg", ".png"}


def slug(stem):
    s = re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")
    return s or "img"


def save(im, path, long_edge, quality):
    im = im.copy()
    im.thumbnail((long_edge, long_edge))
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("name")
    ap.add_argument("--prefix", default="", help="prepended to every filename")
    ap.add_argument("--full", type=int, default=1800, help="long edge of the full-size copy")
    ap.add_argument("--quality", type=int, default=74, help="JPEG quality of the full-size copy")
    ap.add_argument("--thumb", type=int, default=420, help="long edge of the thumbnail")
    a = ap.parse_args()

    src = Path(a.src).expanduser()
    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXT)
    if not files:
        sys.exit(f"No jpg/png files in {src} (convert HEIC first: sips -s format jpeg in.heic --out out.jpg)")

    out = ROOT / "assets" / "img" / slug(a.name)
    (out / "full").mkdir(parents=True, exist_ok=True)
    (out / "thumb").mkdir(parents=True, exist_ok=True)

    ids = []
    for p in files:
        fn = a.prefix + slug(p.stem)
        im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        save(im, out / "full" / f"{fn}.jpg", a.full, a.quality)
        save(im, out / "thumb" / f"{fn}.jpg", a.thumb, 72)
        ids.append(f"'{slug(a.name)}/{fn}'")
        print(f"  {p.name} -> {slug(a.name)}/{fn}.jpg")

    print(f"\n{len(ids)} images. For data.js:\n\nimages: [{', '.join(ids)}],")


if __name__ == "__main__":
    main()
