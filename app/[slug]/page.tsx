import { TipContent } from "@/components/tip-content";
import { Button } from "@/components/ui/button";
import { allTips } from "content-collections";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string;
    };
}

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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/demos">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Demos
                    </Button>
                </Link>
            </div>
            <TipContent tip={tip} />
        </div>
    );
} 