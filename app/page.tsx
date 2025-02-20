import { Metadata } from 'next'
import { HomeContent } from './home-content'

// Revalidate every 12 hours
export const revalidate = 43200

export const metadata: Metadata = {
  title: 'Cursor Intro - Best Cursor Tips & Tricks',
  description: 'Quick video tutorials and screenshots to help you master Cursor. Short and focused tips to get you started.',
}

export default function HomePage() {
  return <HomeContent />
}
