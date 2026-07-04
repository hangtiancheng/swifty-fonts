import localFont from "next/font/local";

export const Swifty = localFont({
  src: [
    {
      path: "./Swifty/WOFF2/Swifty-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Swifty/WOFF2/Swifty-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Swifty/WOFF2/Swifty-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Swifty/WOFF2/Swifty-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-swifty",
  fallback: [
    "SFMono-Regular",
    "Menlo",
    "Cascadia Code",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "monospace",
  ],
});
