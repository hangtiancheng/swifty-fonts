/**
 * Copyright (c) 2026 hangtiancheng
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
