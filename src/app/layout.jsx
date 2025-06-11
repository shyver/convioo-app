import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Convioo',
  description: 'Convioo is a new interactive video platform that allows users to create and share engaging video content with embedded questions and prompts, fostering a more interactive and dynamic viewing experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">  
      <body className={inter.className}>{children}</body>
    </html>
  )
}
