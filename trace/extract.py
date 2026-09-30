#!/usr/bin/env python3
"""Read the hidden `trace-data` JSON from a folder of TRACE PNGs.

Usage:
    python3 extract.py path/to/pngs [output_dir]

Writes three files to output_dir (default: the PNG folder):
    traces.json   every response, exactly as stored
    cities.csv    one row per city (answers, species, stroke counts)
    points.csv    one row per drawn point (for visualizing the lines)

Standard library only.
"""
import csv
import json
import struct
import sys
import zlib
from pathlib import Path

KEY = b"trace-data"


def read_trace(path):
    data = path.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    pos = 8
    while pos + 8 <= len(data):
        (length,) = struct.unpack(">I", data[pos:pos + 4])
        ctype = data[pos + 4:pos + 8]
        body = data[pos + 8:pos + 8 + length]
        if ctype == b"tEXt":
            key, _, text = body.partition(b"\0")
            if key == KEY:
                return json.loads(text.decode("latin-1"))
        elif ctype == b"iTXt":
            key, _, rest = body.partition(b"\0")
            if key == KEY:
                compressed = rest[0]
                _, _, rest = rest[2:].partition(b"\0")  # language tag
                _, _, text = rest.partition(b"\0")      # translated keyword
                return json.loads((zlib.decompress(text) if compressed else text).decode("utf-8"))
        elif ctype == b"IEND":
            break
        pos += 12 + length
    return None


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    src = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else src
    out.mkdir(parents=True, exist_ok=True)

    traces, missing = [], []
    for png in sorted(src.glob("*.png")) + sorted(src.glob("*.PNG")):
        t = read_trace(png)
        if t is None:
            missing.append(png.name)
            continue
        t["_file"] = png.name
        traces.append(t)

    (out / "traces.json").write_text(json.dumps(traces, ensure_ascii=False, indent=2), encoding="utf-8")

    with open(out / "cities.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["file", "id", "createdAt", "lang", "currentCity", "ageRange",
                    "cityIndex", "city", "years", "stillHere", "lineNote",
                    "strokeCount", "pointCount", "noSpecies", "speciesCount", "species"])
        for t in traces:
            for i, c in enumerate(t["cities"], 1):
                species = "; ".join(f'{s["name"]} ({s["firstNoticed"] or "-"})' for s in c["species"])
                w.writerow([t["_file"], t["id"], t["createdAt"], t["lang"], t["currentCity"] or "",
                            t["ageRange"] or "", i, c["name"], c["years"], c["stillHere"],
                            c["lineNote"] or "", len(c["strokes"]), sum(len(s) for s in c["strokes"]),
                            c["noSpecies"], len(c["species"]), species])

    with open(out / "points.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["id", "cityIndex", "city", "years", "stroke", "point", "x", "y", "t_ms", "yearPos"])
        for t in traces:
            for i, c in enumerate(t["cities"], 1):
                for si, stroke in enumerate(c["strokes"], 1):
                    for pi, (x, y, ms) in enumerate(stroke, 1):
                        w.writerow([t["id"], i, c["name"], c["years"], si, pi, x, y, ms,
                                    round(x * c["years"], 4)])

    print(f"Read {len(traces)} trace(s) -> {out}")
    if missing:
        print(f"No trace data in {len(missing)} file(s): {', '.join(missing)}")
        print("(Images saved through some photo apps or messengers lose hidden data. Ask for the original file.)")


if __name__ == "__main__":
    main()
