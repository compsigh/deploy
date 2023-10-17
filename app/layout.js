import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const ProtoMono = localFont({
  src: [
    {
      path: './fonts/ProtoMono-Light.woff',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/ProtoMono-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/ProtoMono-Medium.woff',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/ProtoMono-SemiBold.woff',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-proto-mono'
})

const iAWriterQuattro = localFont({
  src: [
    {
      path: './fonts/iAWriterQuattroS-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/iAWriterQuattroS-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: './fonts/iAWriterQuattroS-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './fonts/iAWriterQuattroS-BoldItalic.woff2',
      weight: '700',
      style: 'italic'
    }
  ],
  variable: '--font-ia-writer-quattro'
})

export const metadata = {
  title: 'DEPLOY/23',
  description: 'DEPLOY/23 — compsigh\'s first hackathon, and our biggest event of the semester. An interdisciplinary three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ProtoMono.variable} ${iAWriterQuattro.variable}`}>
      <body>{children}</body>
    </html>
  )
}
