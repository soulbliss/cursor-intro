import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const diligenceAdUrl =
  'https://cal.com/deeps-diligenceai.dev/30-min-meeting?utm_source=cursorintro&utm_medium=top_banner&utm_campaign=ai_product_partner'

const diligenceSiteUrl =
  'https://diligenceai.dev/?via=cursorintro&utm_source=cursorintro&utm_medium=top_banner&utm_campaign=ai_product_partner'

export function PromoBanner() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[linear-gradient(100deg,#101827_0%,#0f4c45_48%,#7c2d3b_100%)] text-white shadow-sm">
      <div className="container flex h-9 items-center justify-center gap-2 overflow-hidden text-sm">
        <span className="hidden truncate font-medium text-zinc-100 sm:inline">
          Have an AI product idea?{' '}
          <Link
            href={diligenceSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 hover:text-white"
          >
            DiligenceAI.dev
          </Link>{' '}
          is your technical partner for AI MVPs, apps, and workflow automation.
        </span>
        <span className="truncate text-xs font-medium text-zinc-100 sm:hidden">
          Have an AI product idea?
        </span>
        <Link
          href={diligenceAdUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-white px-3 py-0.5 text-xs font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-zinc-200"
        >
          Book a build call
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
