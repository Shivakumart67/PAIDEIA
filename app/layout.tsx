import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfittiProvider } from '@/components/providers/confetti-provider'

export const metadata: Metadata = {
  title: 'PAIDEIA',
  description: 'LMS PLATFORM TO EXPLORE WHAT EVER YOU WANT...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <ConfittiProvider /> <ToastProvider /> {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
