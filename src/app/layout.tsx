// import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/util/ThemeProvider'
import { Header } from '@/components/global/Header'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Art Contest',
  description: 'GEM Project Art Contest 2024',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-neutral-50 text-neutral-950 antialiased dark:bg-neutral-950 dark:text-neutral-50`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <Header />
            <main className="content-width mx-auto max-w-[1800px] px-4 lg:px-8">
              <Toaster position="bottom-center" />
              {children}
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
