import localFont from "next/font/local";

export const SwiftyExtended = localFont({
  src: [
    {
      path: "./Swifty/WOFF2/Swifty-Extended.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Swifty/WOFF2/Swifty-ExtendedItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Swifty/WOFF2/Swifty-ExtendedBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Swifty/WOFF2/Swifty-ExtendedBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-swifty-extended",
  fallback: [
    "SFMono-Regular",
    "Menlo",
    "Cascadia Code",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "monospace",
  ],
});
