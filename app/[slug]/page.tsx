import { TipContent } from "@/components/tip-content";
import { allTips } from "content-collections";
import { Metadata } from "next";
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
        title: tip.title,
        description: tip.summary,
        alternates: {
            canonical: `${tip._meta.path}`,
        },
        openGraph: {
            title: tip.title,
            description: tip.summary,
            type: "article",
            publishedTime: new Date(tip.date).toISOString(),
            authors: [tip.author.name],
            images: tip.media.screenshots?.map(s => ({
                url: s.url,
                alt: s.caption || tip.title,
            })) || [],
        },
        twitter: {
            card: "summary_large_image",
            title: tip.title,
            description: tip.summary,
            images: tip.media.screenshots?.[0]?.url,
        },
    };
}

export default function TipPage({ params }: PageProps) {
    const tip = allTips.find((t) => t._meta.path === params.slug);

    if (!tip) {
        notFound();
    }

    return <TipContent tip={tip} />;
} 