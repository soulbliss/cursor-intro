import { getVideoThumbnail, isVideoUrl } from "@/utils/video";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface VideoThumbnailProps {
    videoUrl: string;
    title: string;
}

export function VideoThumbnail({ videoUrl, title }: VideoThumbnailProps) {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        async function generateThumbnail() {
            try {
                // First try platform-specific thumbnails
                if (isVideoUrl(videoUrl)) {
                    const platformThumbnail = getVideoThumbnail(videoUrl);
                    if (platformThumbnail) {
                        setThumbnailUrl(platformThumbnail);
                        setIsLoading(false);
                        return;
                    }
                }

                // If not a platform URL or no thumbnail found, try direct video
                const video = document.createElement('video');
                video.crossOrigin = 'anonymous';
                video.src = videoUrl;

                video.addEventListener('loadeddata', () => {
                    // Create canvas if needed
                    if (!canvasRef.current) {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvasRef.current = canvas;
                    }

                    // Seek to 1 second or 10% of duration
                    const seekTime = Math.min(1, video.duration * 0.1);
                    video.currentTime = seekTime;
                });

                video.addEventListener('seeked', () => {
                    if (canvasRef.current) {
                        const ctx = canvasRef.current.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
                            const thumbnailDataUrl = canvasRef.current.toDataURL('image/jpeg');
                            setThumbnailUrl(thumbnailDataUrl);
                        }
                    }
                    setIsLoading(false);
                    video.remove();
                });

                video.addEventListener('error', () => {
                    console.warn("Could not load video for thumbnail generation");
                    setIsLoading(false);
                    video.remove();
                });

            } catch (e) {
                console.warn("Could not generate thumbnail for direct video:", e);
                setIsLoading(false);
            }
        }

        generateThumbnail();

        return () => {
            if (videoRef.current) {
                videoRef.current.remove();
            }
        };
    }, [videoUrl]);

    if (isLoading) {
        return (
            <div className="relative h-32 w-full overflow-hidden rounded-md bg-accent animate-pulse" />
        );
    }

    return (
        <div className="relative h-32 w-full overflow-hidden rounded-md bg-accent">
            {thumbnailUrl ? (
                <>
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-12 h-12 text-white" />
                    </div>
                </>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground" />
                </div>
            )}
        </div>
    );
} 