// Component imports
import AuthWrapper from '@/components/AuthWrapper'

// Style imports
import localFont from 'next/font/local'
import './globals.css'

const ProtoMono = localFont({
  src: [
    {
      path: '../public/fonts/ProtoMono-Light.woff',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/ProtoMono-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/ProtoMono-Medium.woff',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/ProtoMono-SemiBold.woff',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-proto-mono'
})

const iAWriterQuattro = localFont({
  src: [
    {
      path: '../public/fonts/iAWriterQuattroS-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/iAWriterQuattroS-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/fonts/iAWriterQuattroS-Bold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/fonts/iAWriterQuattroS-BoldItalic.woff2',
      weight: '600',
      style: 'italic'
    }
  ],
  variable: '--font-ia-writer-quattro'
})

let metadataBase
if (process.env.VERCEL_URL)
  metadataBase = `https://${process.env.VERCEL_URL}`
else
  metadataBase = `http://localhost:${process.env.PORT || 3000}`

export const metadata = {
  metadataBase,
  title: 'DEPLOY/23',
  description: 'DEPLOY/23 — compsigh\'s first hackathon, and our biggest event of the semester. An interdisciplinary three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.',
  openGraph: {
    images: '/banner-grid.png'
  }
}

export default function RootLayout ({ children }) {
  return (
    <AuthWrapper>
      <html lang="en" className={`${ProtoMono.variable} ${iAWriterQuattro.variable}`}>
        <body>{children}</body>
      </html>
    </AuthWrapper>
  )
}
