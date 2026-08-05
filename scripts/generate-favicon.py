#!/usr/bin/env python3
"""Generate favicon set from source JPG."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC = Path("/Users/bverheul/Desktop/CC_Favicon.jpg")

img = Image.open(SRC).convert("RGBA")

# Square crop from center if needed
w, h = img.size
if w != h:
    size = min(w, h)
    left = (w - size) // 2
    top = (h - size) // 2
    img = img.crop((left, top, left + size, top + size))

# Multi-resolution ICO (16, 32, 48, 64)
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
ico = img.resize((64, 64), Image.Resampling.LANCZOS)
ico.save(PUBLIC / "favicon.ico", format="ICO", sizes=ico_sizes)

# 512x512 PNG for modern browsers (used as primary favicon)
img.save(PUBLIC / "favicon.png", format="PNG")

# 180x180 Apple touch icon
apple = img.resize((180, 180), Image.Resampling.LANCZOS)
apple.save(PUBLIC / "apple-touch-icon.png", format="PNG")

print("Generated favicon.ico, favicon.png, apple-touch-icon.png")
