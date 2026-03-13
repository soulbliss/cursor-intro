import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PromoBanner() {
  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
      <div className="container flex h-9 items-center justify-center gap-2 text-sm">
        <span className="hidden sm:inline font-medium">
          We turn ideas into AI products &mdash; using Claude, Codex, ElevenLabs &amp; more
        </span>
        <span className="sm:hidden font-medium text-xs">
          Ideas &rarr; AI products, powered by the best tools
        </span>
        <Link
          href="https://diligenceai.dev?via=cursorintro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold transition-colors hover:bg-white/30"
        >
          DiligenceAI
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
