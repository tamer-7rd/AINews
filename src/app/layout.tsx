import './globals.css'
import AppShell from '@/components/layout/AppShell'
import { Roboto, Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '900'],
  variable: '--font-logo',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body className={roboto.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
