import { TweetMediaWrapper } from "@/components/tweet-media";
import { getEmbedUrl, isVideoUrl } from "@/utils/video";
import { Tip } from "content-collections";
import Image from "next/image";

interface TipContentProps {
    tip: Tip;
}

// Extract tweet ID from tweet URL
const getTweetId = (tweetUrl: string) => {
    const match = tweetUrl.match(/status\/(\d+)/);
    return match ? match[1] : null;
};

export function TipContent({ tip }: TipContentProps) {
    return (
        <article className="max-w-4xl mx-auto">
            <div className="space-y-8">
                {/* Title section */}
                <header>
                    <h1 className="text-4xl font-bold">{tip.title}</h1>
                </header>

                {/* Media section */}
                <div className="space-y-8">
                    {/* Video embed */}
                    {tip.media.video && (
                        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                            {isVideoUrl(tip.media.video) ? (
                                <iframe
                                    src={getEmbedUrl(tip.media.video)}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={tip.media.video}
                                    controls
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                    poster={tip.media.screenshots?.[0]?.url}
                                />
                            )}
                        </div>
                    )}

                    {/* Screenshots */}
                    {tip.media.screenshots && (
                        <div className="space-y-8">
                            {tip.media.screenshots.map((screenshot, index) => (
                                <figure key={index} className="space-y-3">
                                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border shadow-md">
                                        <Image
                                            src={screenshot.url}
                                            alt={screenshot.caption || `Screenshot ${index + 1}`}
                                            fill
                                            className="object-contain"
                                            priority={index === 0}
                                        />
                                    </div>
                                    {screenshot.caption && (
                                        <figcaption className="text-sm text-muted-foreground text-center">
                                            {screenshot.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    )}

                    {/* Tweet embed */}
                    {tip.media.tweetUrl && (
                        <div className="rounded-lg overflow-hidden shadow-sm">
                            {getTweetId(tip.media.tweetUrl) && (
                                <TweetMediaWrapper id={getTweetId(tip.media.tweetUrl)!} />
                            )}
                        </div>
                    )}
                </div>

                {/* Content section */}
                <div className="prose prose-gray max-w-none dark:prose-invert">
                    <p className="text-lg leading-relaxed">{tip.summary}</p>
                    <div className="mt-8" dangerouslySetInnerHTML={{ __html: tip.html }} />
                </div>

                {/* Author section */}
                <footer className="border-t pt-6 mt-12">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-medium">Original source: {tip.author.name}</p>
                            <div className="flex gap-3 mt-2">
                                {tip.author.github && (
                                    <a
                                        href={tip.author.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {tip.author.x && (
                                    <a
                                        href={tip.author.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        X (Twitter)
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </article>
    );
} 