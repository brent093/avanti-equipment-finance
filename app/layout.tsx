import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Avanti Equipment Finance | Equipment Financing Solutions',
  description:
    'Avanti Equipment Finance provides fast, flexible equipment financing solutions for businesses. Loans from $10K to $5M+ with competitive rates.',
  keywords: 'equipment financing, equipment loans, business equipment, lease financing, Avanti Equipment Finance',
  openGraph: {
    title: 'Avanti Equipment Finance',
    description: 'Fast, flexible equipment financing for your business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-50 antialiased">
        {children}
      </body>
    </html>
  )
}
