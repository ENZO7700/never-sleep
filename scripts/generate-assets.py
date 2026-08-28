#!/usr/bin/env python3
"""Generate RubberDuck.Space icon and mascot PNG assets."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parent.parent / "public"

# Brand colors
BG = (10, 10, 10, 255)  # #0A0A0A
YELLOW = (255, 215, 0, 255)  # gold duck
YELLOW_DARK = (230, 180, 0, 255)
ORANGE = (255, 140, 0, 255)
ORANGE_DARK = (220, 100, 0, 255)
BLACK = (0, 0, 0, 255)
WHITE = (255, 255, 255, 255)


def draw_app_icon(size: int) -> Image.Image:
    """Geometric duck profile on black rounded square (app icon)."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = size * 0.04
    radius = size * 0.18
    draw.rounded_rectangle(
        (pad, pad, size - pad, size - pad),
        radius=radius,
        fill=BG,
    )

    s = size / 512.0

    # Head circle (profile, facing right)
    head_cx, head_cy = 220 * s, 210 * s
    head_r = 95 * s
    draw.ellipse(
        (head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r),
        fill=YELLOW,
    )

    # Neck / base trapezoid
    neck = [
        (170 * s, 280 * s),
        (250 * s, 280 * s),
        (290 * s, 380 * s),
        (130 * s, 380 * s),
    ]
    draw.polygon(neck, fill=YELLOW)

    # Beak (two-part orange, overlapping head)
    upper_beak = [
        (head_cx + head_r * 0.55, head_cy - 18 * s),
        (head_cx + head_r + 70 * s, head_cy - 5 * s),
        (head_cx + head_r + 55 * s, head_cy + 20 * s),
        (head_cx + head_r * 0.6, head_cy + 8 * s),
    ]
    lower_beak = [
        (head_cx + head_r * 0.55, head_cy + 8 * s),
        (head_cx + head_r + 55 * s, head_cy + 20 * s),
        (head_cx + head_r + 45 * s, head_cy + 38 * s),
        (head_cx + head_r * 0.5, head_cy + 28 * s),
    ]
    draw.polygon(upper_beak, fill=ORANGE)
    draw.polygon(lower_beak, fill=ORANGE_DARK)

    # Re-draw head front edge over beak connection
    draw.ellipse(
        (head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r),
        fill=YELLOW,
    )
    draw.polygon(upper_beak, fill=ORANGE)
    draw.polygon(lower_beak, fill=ORANGE_DARK)

    # Eye
    eye_cx, eye_cy = head_cx + 35 * s, head_cy - 15 * s
    eye_r = 16 * s
    draw.ellipse(
        (eye_cx - eye_r, eye_cy - eye_r, eye_cx + eye_r, eye_cy + eye_r),
        fill=BLACK,
    )
    glint_r = 5 * s
    draw.ellipse(
        (
            eye_cx + 4 * s - glint_r,
            eye_cy - 6 * s - glint_r,
            eye_cx + 4 * s + glint_r,
            eye_cy - 6 * s + glint_r,
        ),
        fill=WHITE,
    )

    # Neck again on top of beak base
    draw.polygon(neck, fill=YELLOW)

    return img


def draw_mascot(size: int) -> Image.Image:
    """Full-body rubber duck mascot with real alpha transparency."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    s = size / 512.0

    # Body (large rounded ellipse)
    body_box = (80 * s, 220 * s, 400 * s, 460 * s)
    draw.ellipse(body_box, fill=YELLOW)

    # Body shading
    shade_box = (100 * s, 320 * s, 380 * s, 450 * s)
    draw.ellipse(shade_box, fill=YELLOW_DARK)

    # Head
    head_cx, head_cy = 280 * s, 170 * s
    head_r = 110 * s
    draw.ellipse(
        (head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r),
        fill=YELLOW,
    )

    # Head tuft bump
    draw.ellipse(
        (head_cx - 25 * s, head_cy - head_r - 10 * s, head_cx + 25 * s, head_cy - head_r + 30 * s),
        fill=YELLOW,
    )

    # Head underside shading
    draw.ellipse(
        (head_cx - 80 * s, head_cy + 20 * s, head_cx + 60 * s, head_cy + 90 * s),
        fill=YELLOW_DARK,
    )
    draw.ellipse(
        (head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r),
        fill=YELLOW,
    )

    # Beak (open, two parts)
    upper_beak = [
        (head_cx + 60 * s, head_cy - 10 * s),
        (head_cx + 170 * s, head_cy + 5 * s),
        (head_cx + 150 * s, head_cy + 35 * s),
        (head_cx + 65 * s, head_cy + 15 * s),
    ]
    lower_beak = [
        (head_cx + 65 * s, head_cy + 15 * s),
        (head_cx + 150 * s, head_cy + 35 * s),
        (head_cx + 130 * s, head_cy + 55 * s),
        (head_cx + 60 * s, head_cy + 40 * s),
    ]
    draw.polygon(upper_beak, fill=ORANGE)
    draw.polygon(lower_beak, fill=ORANGE_DARK)

    # Eye
    eye_cx, eye_cy = head_cx + 20 * s, head_cy - 25 * s
    eye_r = 18 * s
    draw.ellipse(
        (eye_cx - eye_r, eye_cy - eye_r, eye_cx + eye_r, eye_cy + eye_r),
        fill=BLACK,
    )
    glint_r = 6 * s
    draw.ellipse(
        (
            eye_cx + 5 * s - glint_r,
            eye_cy - 7 * s - glint_r,
            eye_cx + 5 * s + glint_r,
            eye_cy - 7 * s + glint_r,
        ),
        fill=WHITE,
    )

    # Wing (three curved lines)
    wing_cx, wing_cy = 180 * s, 310 * s
    for i, offset in enumerate([0, 18, 36]):
        draw.arc(
            (
                wing_cx - 60 * s,
                wing_cy - 40 * s + offset * s,
                wing_cx + 80 * s,
                wing_cy + 80 * s + offset * s,
            ),
            start=200,
            end=320,
            fill=YELLOW_DARK,
            width=max(2, int(4 * s)),
        )

    # Restore body yellow over shading edges
    draw.ellipse(body_box, fill=YELLOW)
    draw.ellipse(
        (100 * s, 340 * s, 360 * s, 440 * s),
        fill=YELLOW_DARK,
    )

    return img


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if img.size[0] != img.size[1]:
        side = max(img.size)
        square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        square.paste(img, ((side - img.size[0]) // 2, (side - img.size[1]) // 2), img)
        img = square
    img.save(path, "PNG", optimize=True)
    print(f"Wrote {path} ({path.stat().st_size} bytes, {img.size[0]}x{img.size[1]})")


def save_ico(sizes: list[int], source: Image.Image, path: Path) -> None:
    source.convert("RGBA").save(path, format="ICO", sizes=[(s, s) for s in sizes])
    print(f"Wrote {path} ({path.stat().st_size} bytes)")


def main() -> None:
    icon_512 = draw_app_icon(512)
    mascot_512 = draw_mascot(512)

    save_png(icon_512, PUBLIC / "logoduck.png")
    save_png(icon_512, PUBLIC / "pwa-512x512.png")
    save_png(icon_512.resize((192, 192), Image.Resampling.LANCZOS), PUBLIC / "pwa-192x192.png")
    save_png(icon_512.resize((180, 180), Image.Resampling.LANCZOS), PUBLIC / "apple-touch-icon.png")
    save_png(icon_512.resize((32, 32), Image.Resampling.LANCZOS), PUBLIC / "favicon-32.png")
    save_ico([16, 32], icon_512, PUBLIC / "favicon.ico")
    save_png(mascot_512, PUBLIC / "mascot-duck.png")


if __name__ == "__main__":
    main()
