import { cn } from "@/lib/utils"
import { AlertTriangle, BookMarked, Home, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const pathname = usePathname()

    const navigation = [
        {
            href: "/",
            label: "Home",
            icon: Home
        },
        {
            href: "/insights",
            label: "Insights",
            icon: Sparkles
        },
        {
            href: "/best-practices",
            label: "Best Practices",
            icon: BookMarked
        },
        {
            href: "/mistakes-to-avoid",
            label: "Common Mistakes",
            icon: AlertTriangle
        }
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-display font-bold">Cursor Intro</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navigation.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-2 transition-colors hover:text-foreground/80",
                                    pathname === href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add any header actions here (e.g., search, theme toggle, etc.) */}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden">
                    <nav className="flex items-center">
                        {navigation.map(({ href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "px-3",
                                    pathname === href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
} 