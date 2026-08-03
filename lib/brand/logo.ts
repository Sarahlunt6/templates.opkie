/* ------------------------------------------------------------------ *
 *  Brand Studio — reading a logo file, entirely in the browser.
 *
 *  FileReader turns the file into a data URL; a canvas measures the two
 *  things the templates need to place it well — its proportions, and
 *  whether it is dark enough to need a plate behind it on the espresso
 *  and ink grounds. Nothing leaves the tab.
 * ------------------------------------------------------------------ */

import type { BrandLogo } from "@/components/brand/BrandStudioProvider";

/** sessionStorage tops out around 5MB; a logo well under that is plenty. */
export const MAX_LOGO_BYTES = 2 * 1024 * 1024;

export const ACCEPTED_LOGO_TYPES = [
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "image/webp",
];

export class LogoError extends Error {}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new LogoError("That file could not be read."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new LogoError("That file is not an image we can display."));
    img.src = src;
  });
}

/**
 * Average the luminance of the mark's *opaque* pixels. A transparent PNG
 * of black lettering reads as dark; a white knockout reads as light; and
 * the mostly-empty canvas around either one is correctly ignored.
 */
function measureDarkness(img: HTMLImageElement): boolean {
  // An SVG with no intrinsic size gives a 0×0 image; nothing to sample.
  if (!img.width || !img.height) return false;

  const w = 64;
  const h = Math.max(1, Math.round((img.height / img.width) * w)) || 64;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(img, 0, 0, w, h);

  let sum = 0;
  let counted = 0;
  try {
    const { data } = ctx.getImageData(0, 0, w, h);
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 24) continue; // effectively transparent — not part of the mark
      sum +=
        (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      counted += 1;
    }
  } catch {
    return false; // tainted canvas; assume it reads fine as-is
  }

  if (!counted) return false;
  return sum / counted < 0.5;
}

/** Turn a picked file into everything the templates need to render it. */
export async function readLogoFile(file: File): Promise<BrandLogo> {
  if (!file.type.startsWith("image/")) {
    throw new LogoError("Please choose an image file — PNG, SVG, or JPG.");
  }
  if (file.size > MAX_LOGO_BYTES) {
    throw new LogoError("That logo is over 2MB. A smaller export works best.");
  }

  const src = await readAsDataUrl(file);
  const img = await loadImage(src);

  return {
    src,
    aspect: img.width && img.height ? img.width / img.height : 1,
    dark: measureDarkness(img),
    name: file.name.replace(/\.[^.]+$/, ""),
  };
}
