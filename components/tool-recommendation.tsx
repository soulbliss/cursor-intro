'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const DISMISS_KEY = 'cursorintro:diligenceai-ad-dismissed'

const diligenceAd = {
    title: 'Have an AI product idea?',
    description:
        'DiligenceAI.dev is your technical partner for AI MVPs, internal agents, and workflow automations.',
    siteLink: 'https://diligenceai.dev/?via=cursorintro&utm_source=cursorintro&utm_medium=floating_ad&utm_campaign=ai_product_partner',
    link: 'https://cal.com/deeps-diligenceai.dev/30-min-meeting?utm_source=cursorintro&utm_medium=floating_ad&utm_campaign=ai_product_partner',
    cta: 'Book a build call',
}

export function ToolRecommendation() {
    const [isVisible, setIsVisible] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsVisible(false)

        const wasDismissed = window.localStorage.getItem(DISMISS_KEY) === 'true'
        setIsClosed(wasDismissed)

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        const timer = setTimeout(() => {
            if (!wasDismissed) {
                setIsVisible(true)
            }
        }, 2500)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', checkMobile)
        }
    }, [pathname])

    const handleClose = () => {
        window.localStorage.setItem(DISMISS_KEY, 'true')
        setIsVisible(false)
        setIsClosed(true)
    }

    if (isClosed) return null

    return (
        <div
            className={cn(
                'fixed z-50 transition-all duration-300 ease-in-out',
                isMobile
                    ? 'bottom-0 left-0 right-0 transform translate-y-full'
                    : 'bottom-4 right-4 max-w-[390px] transform translate-y-[150%]',
                isVisible && 'transform translate-y-0'
            )}
        >
            <div className="overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:border-zinc-700 dark:bg-zinc-950">
                <div className="h-1 bg-[linear-gradient(90deg,#14b8a6_0%,#f43f5e_100%)]" />
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-10 h-6 w-6 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={handleClose}
                    >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Close</span>
                    </Button>

                    <div className="px-4 py-4 pr-10">
                        <div className="min-w-0">
                            <h3 className="mb-1.5 text-base font-semibold leading-snug text-gray-950 dark:text-white">
                                {diligenceAd.title}
                            </h3>
                            <p className="text-sm leading-5 text-gray-600 dark:text-gray-300">
                                <Link
                                    href={diligenceAd.siteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-gray-800 underline decoration-zinc-400 underline-offset-4 transition-colors hover:text-teal-700 dark:text-gray-100 dark:hover:text-teal-300"
                                >
                                    DiligenceAI.dev
                                </Link>{' '}
                                is your technical partner for AI MVPs, internal agents, and workflow automations.
                            </p>
                            <Link
                                href={diligenceAd.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-950 transition-colors hover:bg-zinc-200 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                            >
                                {diligenceAd.cta}
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
