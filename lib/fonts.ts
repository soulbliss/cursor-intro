import {
  DM_Sans,
  Space_Grotesk
} from 'next/font/google'

export const fontSans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontDisplay = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
})