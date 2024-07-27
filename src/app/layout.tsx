// import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/util/ThemeProvider'
import { Header } from '@/components/global/Header'
import { auth, signIn } from '@/auth'
import { SessionProvider } from 'next-auth/react'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Art Contest',
  description: 'Gem City Art Contest 2024',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <Header />
            <main className="content-width mx-auto px-4 lg:px-8">
              {children}
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
