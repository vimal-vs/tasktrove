import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import NavBar from '../components/NavBar';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <ThemeProvider>
          <div className='flex flex-col min-h-screen w-full items-center dark:bg-neutral-950'>
            <ClerkProvider>
              <NavBar />
              <Separator />
              <main className='flex flex-grow items-center justify-center dark:bg-neutral-950'>{children}</main>
            </ClerkProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
