import { siteConfig } from '@/config/site'
import { poppins } from '@/lib/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-poppins antialiased ${poppins.variable} bg-zinc-50 text-zinc-500`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
