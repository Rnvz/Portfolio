import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Geist_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { Cursor } from '@/components/layout/Cursor'
import { NavDots } from '@/components/layout/NavDots'
import { MagnifierHint } from '@/components/layout/MagnifierHint'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Yohanes Wenanta — Full Stack Developer & UI/UX Designer',
  description:
    'Full Stack Developer and UI/UX Designer based in Jakarta, Indonesia. ' +
    'Building production web systems and thoughtful digital experiences.',
  keywords: ['full stack developer', 'ui ux designer', 'next.js', 'jakarta', 'indonesia'],
  openGraph: {
    title: 'Yohanes Wenanta',
    description: 'Full Stack Developer & UI/UX Designer',
    url: 'https://yohaneswenanta.pages.dev',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <Cursor />
          <NavDots />
          <MagnifierHint />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
