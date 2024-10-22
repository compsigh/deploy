// Next
import type { Metadata } from "next"

// Style imports
import localFont from "next/font/local"
import "./globals.css"

const ProtoMono = localFont({
  src: [
    {
      path: "../public/fonts/ProtoMono-Light.woff",
      weight: "300",
      style: "normal"
    },
    {
      path: "../public/fonts/ProtoMono-Regular.woff",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/ProtoMono-Medium.woff",
      weight: "500",
      style: "normal"
    },
    {
      path: "../public/fonts/ProtoMono-SemiBold.woff",
      weight: "600",
      style: "normal"
    }
  ],
  variable: "--font-proto-mono"
})

const iAWriterQuattro = localFont({
  src: [
    {
      path: "../public/fonts/iAWriterQuattroS-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/iAWriterQuattroS-Italic.woff2",
      weight: "400",
      style: "italic"
    },
    {
      path: "../public/fonts/iAWriterQuattroS-Bold.woff2",
      weight: "600",
      style: "normal"
    },
    {
      path: "../public/fonts/iAWriterQuattroS-BoldItalic.woff2",
      weight: "600",
      style: "italic"
    }
  ],
  variable: "--font-ia-writer-quattro"
})

let metadataBase: URL
if (process.env.VERCEL_URL)
  metadataBase = new URL(`https://${process.env.VERCEL_URL}`)
else
  metadataBase = new URL(`http://localhost:${process.env.PORT || 3000}`)

export const metadata: Metadata = {
  metadataBase,
  title: "DEPLOY/24",
  description: "compsigh's second annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people && building cool things.",
  openGraph: {
    images: "/DEPLOY24.png"
  }
}

export default function RootLayout(
  { children }:
  Readonly<{ children: React.ReactNode }>
) {
  return (
    <html
      lang="en"
      className={`${ProtoMono.variable} ${iAWriterQuattro.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
