import './global.css'
import { Inter, Lexend_Deca } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lexendDeca = Lexend_Deca({ subsets: ['latin'], variable: '--font-lexend-deca' })

export const metadata : any = {
  title: 'Only Creators - Turn Views into Revenue',
  description: 'Join Only Creators to transform your views into real earnings with brand campaigns.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lexendDeca.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
