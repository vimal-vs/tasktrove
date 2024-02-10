import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Separator } from '../components/ui/separator';
import { ThemeProvider } from '@/src/providers/ThemeProvider';
import { cn } from '@/src/lib/utils';
import NavBar from '../components/NavBar';
import { Toaster } from '../components/ui/toaster';
import SessionProvider from '../components/SessionProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskTrove',
  description: 'Streamlined task management and reminders for a stress-free schedule.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.className, "dark")} style={{
      colorScheme: "dark"
    }}>
      <body>
        <SessionProvider>
          <ThemeProvider>
            <div className='flex flex-col min-h-screen w-full items-center dark:bg-neutral-950'>
              <NavBar />
              <Separator />
              <main className='flex flex-grow w-full items-center justify-center bg-neutral-200/90 dark:bg-neutral-950'>
                {children}
                <Toaster />
              </main>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
