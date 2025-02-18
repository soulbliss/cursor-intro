import { Tip } from ".content-collections/generated";
import { FilterState } from "@/components/sidebar-filter";
import { getEmbedUrl, isVideoUrl } from "@/utils/video";
import dayjs from "dayjs";
import { Clock, Gauge, Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TweetMediaWrapper } from "./tweet-media";

interface CategoryGridProps {
    tips: Tip[];
    categories: Array<{ id: string; title: string }>;
    searchQuery: string;
    filters: FilterState;
}

export function CategoryGrid({ tips, categories, searchQuery, filters }: CategoryGridProps) {
    const filteredTips = tips.filter(tip => {
        // Search query filter
        if (searchQuery && !tip.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Category filter
        if (filters.categories.length > 0 && !filters.categories.some(cat => tip.categories.includes(cat))) {
            return false;
        }

        // Difficulty filter
        if (filters.difficulty.length > 0 && !filters.difficulty.includes(tip.difficulty)) {
            return false;
        }

        // Tags filter
        if (filters.tags.length > 0 && !filters.tags.some(tag => tip.categories.includes(tag))) {
            return false;
        }

        return true;
    });

    const filteredCategories = categories.filter(category =>
        filteredTips.some(tip => tip.categories.includes(category.id))
    );

    // Sort categories by number of filtered tips
    const sortedCategories = filteredCategories.sort((a: { id: string; title: string }, b: { id: string; title: string }) => {
        const aTips = filteredTips.filter((tip: Tip) => tip.categories.includes(a.id)).length;
        const bTips = filteredTips.filter((tip: Tip) => tip.categories.includes(b.id)).length;

        // If both categories have tips or both don't have tips, sort alphabetically
        if ((aTips > 0 && bTips > 0) || (aTips === 0 && bTips === 0)) {
            return a.title.localeCompare(b.title);
        }

        // Put categories with tips first
        return bTips - aTips;
    });

    // Extract tweet ID from tweet URL
    const getTweetId = (tweetUrl: string) => {
        const match = tweetUrl.match(/status\/(\d+)/);
        return match ? match[1] : null;
    };

    // If searching and no results found
    if (searchQuery && !filteredTips.length) {
        return (
            <div className="container mx-auto py-12 text-center">
                <p className="text-muted-foreground">No tips found matching your search.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto pb-12 space-y-12 max-w-7xl">
            {sortedCategories.map((category) => {
                const categoryTips = filteredTips.filter((tip: Tip) =>
                    tip.categories.includes(category.id)
                );

                // Show all tips if no search query, otherwise limit to 3
                const displayTips = searchQuery ? categoryTips.slice(0, 3) : categoryTips;

                return (
                    <section key={category.id}>
                        <h2 className="text-3xl font-bold capitalize mb-6">{category.title.replace(/_/g, " ")}</h2>
                        {displayTips.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayTips.map((tip: Tip) => (
                                        <Link
                                            key={tip._meta.path}
                                            href={`/${tip._meta.path}`}
                                            className="block hover:bg-accent rounded-lg border bg-card text-card-foreground shadow-sm transition-colors"
                                        >
                                            <div className="p-6 space-y-4">
                                                {tip.media.screenshots?.[0] && !tip.media.video && (
                                                    <div className="relative md:h-72 h-48 w-full overflow-hidden rounded-md">
                                                        <Image
                                                            src={tip.media.screenshots[0].url}
                                                            alt={tip.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                {tip.media.video && (
                                                    <div className="relative md:h-72 h-48 w-full overflow-hidden rounded-md">
                                                        {isVideoUrl(tip.media.video) ? (
                                                            <iframe
                                                                src={getEmbedUrl(tip.media.video)}
                                                                className="absolute inset-0 w-full h-full"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            />
                                                        ) : (
                                                            <video
                                                                src={tip.media.video}
                                                                controls
                                                                preload="metadata"
                                                                className="absolute inset-0 w-full h-full object-cover"
                                                                poster={tip.media.screenshots?.[0]?.url}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                {tip.media.tweetUrl && !tip.media.screenshots?.[0] && !tip.media.video && (
                                                    <div className="relative md:h-72 h-48 w-full overflow-hidden rounded-md">
                                                        {getTweetId(tip.media.tweetUrl) && (
                                                            <TweetMediaWrapper id={getTweetId(tip.media.tweetUrl)!} />
                                                        )}
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-semibold">{tip.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                                                        {tip.summary}
                                                    </p>
                                                    <div className="flex flex-col gap-2 mt-4 text-xs">
                                                        {/* Difficulty row */}
                                                        <div className="flex items-center gap-1">
                                                            <Gauge className="w-3 h-3" />
                                                            <span className={`capitalize ${tip.difficulty === "beginner" ? "text-emerald-500" :
                                                                tip.difficulty === "intermediate" ? "text-amber-500" :
                                                                    tip.difficulty === "advanced" ? "text-rose-500" :
                                                                        tip.difficulty === "pro" ? "text-violet-500" : ""
                                                                }`}>{tip.difficulty}</span>
                                                        </div>
                                                        {/* Features and Time row */}
                                                        <div className="flex items-center justify-between text-muted-foreground">
                                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                                <Sparkles className="w-3 h-3 shrink-0" />
                                                                <span className="truncate">{tip.feature}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 ml-4 shrink-0">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{dayjs(tip.date).format("MMM D, YYYY")}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {searchQuery && categoryTips.length > 3 && (
                                    <Link
                                        href={`/?category=${category.id}`}
                                        className="text-sm text-primary hover:underline block mt-4"
                                    >
                                        View all {categoryTips.length} tips →
                                    </Link>
                                )}
                            </>
                        ) : (
                            <Link
                                href="https://github.com/soulbliss/cursor-intro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 hover:bg-accent transition-colors"
                            >
                                <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    Contribute a tip for this category
                                </p>
                            </Link>
                        )}
                    </section>
                );
            })}
        </div>
    );
}