# @swifty.js/fonts

A custom monospace font package built on top of [Iosevka](https://github.com/be5invis/Iosevka), designed for use with Next.js via `next/font/local`.

## Installation

```bash
pnpm add @swifty.js/fonts
```

## Usage

Import the font in your Next.js layout or page component:

```tsx
import { Swifty } from "@swifty.js/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

Use them in your styles:

```css
code, pre {
  font-family: var(--font-swifty);
}
```

## Font Weights and Styles

Both variants include:

- Regular (400, normal)
- Italic (400, italic)
- Bold (700, normal)
- Bold Italic (700, italic)
