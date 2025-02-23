import { TipContent } from "@/components/tip-content";
import { Button } from "@/components/ui/button";
import { allTips } from "content-collections";
import dayjs from "dayjs";
import { ArrowLeft, Clock, Gauge, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string;
    };
}

export const revalidate = 86400 // 24 hours

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const tip = allTips.find((t) => t._meta.path === params.slug);

    if (!tip) {
        return {
            title: "Tip Not Found",
        };
    }

    return {
        title: tip.title + ' | Cursor Intro - Best Tips & Tricks',
        description: tip.summary,
        alternates: {
            canonical: `https://cursorintro.com/${tip._meta.path}`,
        },
        openGraph: {
            title: tip.title,
            description: tip.summary,
            type: "article",
            publishedTime: new Date(tip.date).toISOString(),
            authors: [tip.author.name],
            images: 'https://cdn.diligenceai.dev/assets/cursor-intro.webp',
        },
        twitter: {
            card: "summary_large_image",
            title: tip.title,
            description: tip.summary,
            images: 'https://cdn.diligenceai.dev/assets/cursor-intro.webp',
        },
    };
}

export default function TipPage({ params }: PageProps) {
    const tip = allTips.find((t) => t._meta.path === params.slug);

    if (!tip) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen pb-8">
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <Link href="/demos">
                            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Demos
                            </Button>
                        </Link>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Gauge className="w-4 h-4" />
                                <span className={`capitalize ${tip.difficulty === "beginner" ? "text-emerald-500" :
                                    tip.difficulty === "intermediate" ? "text-amber-500" :
                                        tip.difficulty === "advanced" ? "text-rose-500" : ""
                                    }`}>{tip.difficulty}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Sparkles className="w-4 h-4" />
                                <span>{tip.feature}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{dayjs(tip.date).format("MMMM D, YYYY")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main className="container mx-auto px-4 py-6 flex-grow">
                <TipContent tip={tip} />
            </main>
        </div>
    );
} 