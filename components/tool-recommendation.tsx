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
    const [selectedContent, setSelectedContent] = useState<typeof content[0]>()
    const pathname = usePathname()

    const content = [
        {
            title: 'Another Wrapper',
            description: '10+ AI demo apps to build your next AI project faster',
            link: 'https://anotherwrapper.com?aff=1eqmm',
            image: 'https://cdn.diligenceai.dev/assets/another-wrapper.png',
        },
        {
            title: 'Diligence AI',
            description: 'Get your AI MVP built in the next 4 weeks!',
            link: 'http://diligenceai.dev?via=cursorintro',
            image: 'https://cdn.diligenceai.dev/assets/diligence.webp',
        }
    ]

    useEffect(() => {
        setIsClosed(false)
        setIsVisible(false)

        const randomIndex = Math.floor(Math.random() * content.length)
        setSelectedContent(content[randomIndex])

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2500)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', checkMobile)
        }
    }, [pathname])

    const handleClose = () => {
        setIsVisible(false)
        setIsClosed(true)
    }

    if (isClosed || !selectedContent) return null

    return (
        <div
            className={cn(
                'fixed z-50 transition-all duration-300 ease-in-out',
                isMobile
                    ? 'bottom-0 left-0 right-0 transform translate-y-full'
                    : 'bottom-2 right-2 max-w-[350px] transform translate-y-[150%]',
                isVisible && 'transform translate-y-0'
            )}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-5 w-5 rounded-full z-10"
                        onClick={handleClose}
                    >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Close</span>
                    </Button>

                    <Link
                        href={selectedContent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block cursor-pointer"
                    >
                        <div className="flex flex-col md:flex-row items-center py-1 px-4 gap-3">
                            <div className="flex-shrink-0 w-full md:w-1/4">
                                <img
                                    src={selectedContent.image}
                                    alt={selectedContent.title}
                                    width={80}
                                    height={80}
                                    className="w-full hidden md:block h-auto object-contain bg-white/80 rounded-none"
                                />
                            </div>
                            <div className="flex-grow w-full md:w-3/4">
                                <h3 className="font-semibold text-md mb-1 text-gray-900 dark:text-white">
                                    {selectedContent.title}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                    {selectedContent.description}
                                </p>
                                <div className="mt-1">
                                    <button className="text-blue-600 dark:text-blue-300 text-xs font-bold hover:underline hover:text-blue-800 dark:hover:text-blue-400 transition duration-200">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
} 