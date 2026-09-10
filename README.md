<div align="center">

# @swifty.js/fonts

**A custom monospace font package built on [Iosevka](https://github.com/be5invis/Iosevka), designed for Next.js via `next/font/local`.**

[![npm](https://img.shields.io/npm/v/@swifty.js/fonts?label=npm&color=F05138)](https://www.npmjs.com/package/@swifty.js/fonts)
[![License: MIT](https://img.shields.io/badge/License-MIT-f5a623.svg)](./LICENSE)

</div>

---

## Installation

```bash
pnpm add @swifty.js/fonts
```

## Usage

Import the font in your Next.js layout or page component:

```tsx
import { Swifty } from "@swifty.js/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Swifty.variable}>
      <body>{children}</body>
    </html>
  );
}
```

For the extended (wider) variant:

```tsx
import { SwiftyExtended } from "@swifty.js/fonts/extended";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={SwiftyExtended.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### CSS Variable

Each font exposes a CSS custom property:

- `Swifty` -- `--font-swifty`
- `SwiftyExtended` -- `--font-swifty-extended`
- `Rico1` -- `--font-rico1`
- `Rico2` -- `--font-rico2`

Use them in your styles:

```css
code,
pre {
  font-family: var(--font-swifty);
}
```

## Font Weights and Styles

Both Swifty variants include:

- Regular (400, normal)
- Italic (400, italic)
- Bold (700, normal)
- Bold Italic (700, italic)

## Rico variant

A separate sans-serif display family (for CJK-heavy interfaces) is available from
the `./rico` subpath:

```tsx
import { Rico1, Rico2 } from "@swifty.js/fonts/rico";
```

It ships two faces with `Sarasa Gothic SC` / `PingFang SC` / `Microsoft YaHei`
fallbacks, exposed as `--font-rico1` and `--font-rico2`.

## Package exports

| Subpath      | Exports                       |
| ------------ | ----------------------------- |
| `.`          | `Swifty` (Iosevka-based mono) |
| `./extended` | `SwiftyExtended` (wider mono) |
| `./rico`     | `Rico1`, `Rico2` (sans-serif) |
| `./Swifty/*` | Raw Swifty font files         |
| `./Rico/*`   | Raw Rico font files           |
