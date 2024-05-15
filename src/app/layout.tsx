import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import { siteMetadata, siteViewport } from '@/config/site'
import { poppins } from '@/lib/fonts'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = siteMetadata

export const viewport: Viewport = siteViewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`font-poppins antialiased ${poppins.variable} !scroll-smooth bg-zinc-100 text-zinc-500`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
