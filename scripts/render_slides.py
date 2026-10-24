#!/usr/bin/env python3
"""Render selected slides of one lecture to PNG for the VitePress notes.

Usage:
    python3 scripts/render_slides.py 07 2 3 5 9
"""
import sys
from pathlib import Path
import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SLUGS = {
    '01': 'lecture-01-agents',
    '02': 'lecture-02-tool-use',
    '03': 'lecture-03-long-context',
    '04': 'lecture-04-memory-and-skills',
    '05': 'lecture-05-planning',
    '06': 'lecture-06-coding-agents',
    '07': 'lecture-07-computer-use-agents',
    '08': 'lecture-08-sft',
    '09': 'lecture-09-rl-basics',
    '10': 'lecture-10-deep-research-agents',
    '11': 'lecture-11-rl-advanced',
    '12': 'lecture-12-rl-systems',
    '13': 'lecture-13-agent-safety',
    '14': 'lecture-14-openhands',
    '15': 'lecture-15-orchestration-and-monitoring',
}
SCALE = 2.0


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    code = sys.argv[1].zfill(2)
    pages = [int(x) for x in sys.argv[2:]]
    slug = SLUGS[code]
    pdf_path = ROOT / 'slides' / f'{slug}.pdf'
    out_dir = ROOT / 'docs' / 'public' / 'images' / f'lecture-{code}'
    out_dir.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(pdf_path)
    for n in pages:
        if not 1 <= n <= len(doc):
            print(f'skip p{n}: out of range (1..{len(doc)})')
            continue
        path = out_dir / f'p{n:02d}.png'
        pix = doc[n - 1].get_pixmap(matrix=pymupdf.Matrix(SCALE, SCALE), alpha=False)
        pix.save(path)
        im = Image.open(path).convert('RGB')
        im.save(path, optimize=True, compress_level=9)
        print(f'{path.relative_to(ROOT)} {im.width}x{im.height} {path.stat().st_size // 1024}KB')


if __name__ == '__main__':
    main()
