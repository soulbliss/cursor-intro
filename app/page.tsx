import { siteConfig } from '@/config/site'
import { Metadata } from 'next'
import { HomeContent } from './home-content'
import { getMistakes } from './mistakes-to-avoid/page'

// Revalidate every 12 hours
export const revalidate = siteConfig.revalidate

export const metadata: Metadata = {
  title: 'Cursor Intro - Best Cursor Tips & Tricks',
  description: 'Quick video tutorials and screenshots to help you master Cursor. Short and focused tips to get you started.',
}

export default async function HomePage() {
  const mistakes = await getMistakes()

  return <HomeContent mistakes={mistakes} />
}
