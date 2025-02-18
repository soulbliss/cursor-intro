import { TweetMediaWrapper } from "@/components/tweet-media";
import { getEmbedUrl, isVideoUrl } from "@/utils/video";
import { Tip } from "content-collections";
import dayjs from "dayjs";
import { Clock, Gauge, Sparkles } from "lucide-react";
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
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <div className="space-y-8">
                {/* Title and metadata section */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{tip.title}</h1>
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

                {/* Media section */}
                <div className="space-y-6">
                    {/* Video embed */}
                    {tip.media.video && (
                        <div className="aspect-video rounded-lg overflow-hidden">
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
                        <div className="space-y-4">
                            {tip.media.screenshots.map((screenshot, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border">
                                        <Image
                                            src={screenshot.url}
                                            alt={screenshot.caption || `Screenshot ${index + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    {screenshot.caption && (
                                        <p className="text-sm text-muted-foreground text-center">
                                            {screenshot.caption}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tweet embed */}
                    {tip.media.tweetUrl && (
                        <div className="rounded-lg overflow-hidden">
                            {getTweetId(tip.media.tweetUrl) && (
                                <TweetMediaWrapper id={getTweetId(tip.media.tweetUrl)!} />
                            )}
                        </div>
                    )}
                </div>

                {/* Content section */}
                <div className="prose prose-gray max-w-none dark:prose-invert">
                    <p className="text-lg leading-relaxed">{tip.summary}</p>
                    <div dangerouslySetInnerHTML={{ __html: tip.html }} />
                </div>

                {/* Author section */}
                <div className="border-t pt-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="font-medium">Original source: {tip.author.name}</p>
                            <div className="flex gap-3 mt-2">
                                {tip.author.github && (
                                    <a
                                        href={tip.author.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {tip.author.x && (
                                    <a
                                        href={tip.author.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        X (Twitter)
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 