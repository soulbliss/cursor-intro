import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
    Github,
    Twitter
} from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
    // Main navigation links ordered by popularity based on analytics
    const mainLinks = [
        { href: "/", label: "Home", visitors: "4.8k" },
        { href: "/insights", label: "Insights", visitors: "1.5k" },
        { href: "/best-practices", label: "Best Practices", visitors: "1.2k" },
        { href: "/mistakes-to-avoid", label: "Common Mistakes", visitors: "601" },
        { href: "/demos", label: "Video Demos", visitors: "310" },
        { href: "/agent", label: "Agent", visitors: "286" },
        { href: "/agent-mcp", label: "Agent MCP", visitors: "150" }
    ];

    // Popular insight articles based on analytics
    const popularInsights = [
        {
            href: "/insights/solving-ai-code-generation-hallucinations-with-model-context-protocol-for-supabase-integration",
            label: "Solving AI Code Hallucinations",
            visitors: "365"
        },
        {
            href: "/insights/Best-Practices-for-Using-Cursor-AI-in-Large-Scale-Projects",
            label: "Cursor AI in Large-Scale Projects",
            visitors: "303"
        },
        {
            href: "/insights/best-practices-for-iterative-development-with-composer-ai-assistant",
            label: "Iterative Development with Composer AI",
            visitors: "196"
        },
    ];

    const resourceLinks = [
        { href: "https://github.com/soulbliss/cursor-intro", label: "GitHub Repo" },
        { href: "https://analytics.deeps.dev/cursorintro.com", label: "Traffic Stats" }
    ];

    const socialLinks = [
        { href: siteConfig.links.github, icon: Github, label: "GitHub" },
        { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
    ];

    return (
        <footer className="w-full border-t bg-background py-8 mb-12">
            <div className="container">
                {/* Main footer content */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 mb-8">
                    {/* About section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Cursor Intro</h3>
                        <p className="text-sm text-muted-foreground">
                            {siteConfig.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            {socialLinks.map(({ href, icon: Icon, label }) => (
                                <Link key={label} href={href} target="_blank" rel="noreferrer">
                                    <Button variant="ghost" size="icon" className="h-9 w-9">
                                        <Icon className="h-5 w-5" />
                                        <span className="sr-only">{label}</span>
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Main Pages */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Main Pages</h3>
                        <nav className="grid grid-cols-1 gap-2">
                            {mainLinks.slice(0, 5).map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Popular Content */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Popular Content</h3>
                        <nav className="grid grid-cols-1 gap-2">
                            {popularInsights.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Resources</h3>
                        <nav className="grid grid-cols-1 gap-2">
                            {resourceLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                            {mainLinks.slice(5).map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

            </div>
        </footer>
    );
} 