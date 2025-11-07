import '../styles/globals.css'
import type { ReactNode } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/components/theme-provider'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Whiskey Collection',
  description: 'Personal whiskey collection manager',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}


