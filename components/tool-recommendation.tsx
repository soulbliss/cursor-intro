'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ToolRecommendation() {
    const [isVisible, setIsVisible] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        // Reset states on page navigation
        setIsClosed(false)
        setIsVisible(false)

        // Set mobile state based on screen width
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        // Show popup after 2.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2500)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', checkMobile)
        }
    }, [pathname]) // Reset and show on every page navigation

    const handleClose = () => {
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
                    : 'bottom-4 right-4 max-w-[320px] transform translate-y-[200%]',
                isVisible && 'transform translate-y-0'
            )}
        >
            <div className="bg-white dark:bg-background rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full z-10"
                        onClick={handleClose}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>

                    <Link
                        href="https://anotherwrapper.com?aff=1eqmm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block cursor-pointer"
                    >
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src="https://cdn.diligenceai.dev/assets/another-wrapper.png"
                                    alt="Another Wrapper"
                                    width={100}
                                    height={30}
                                    className="h-8 w-auto bg-white/80"
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-300">
                                10+ customizable AI demo apps: pick one, make it yours, launch your AI app today!
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
} 