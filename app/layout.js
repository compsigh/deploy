import AuthWrapper from '@/components/AuthWrapper'

import './globals.css'

export const metadata = {
  title: 'DEPLOY/23',
  description: 'DEPLOY/23 — compsigh\'s first hackathon, and our biggest event of the semester. An interdisciplinary three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.'
}

export default function RootLayout ({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthWrapper>
  )
}
