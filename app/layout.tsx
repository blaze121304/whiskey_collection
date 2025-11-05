import '../styles/globals.css'
import type { ReactNode } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'Whiskey Collection',
  description: 'Personal whiskey collection manager',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
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


