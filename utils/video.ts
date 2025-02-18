export function getVideoThumbnail(videoUrl: string): string | null {
    try {
        const url = new URL(videoUrl);

        // YouTube
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
            const videoId = url.hostname.includes('youtu.be')
                ? url.pathname.slice(1)
                : url.searchParams.get('v');
            if (videoId) {
                return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
        }

        // Vimeo
        if (url.hostname.includes('vimeo.com')) {
            const videoId = url.pathname.split('/').pop();
            if (videoId) {
                return `https://vumbnail.com/${videoId}.jpg`;
            }
        }

        return null;
    } catch {
        return null;
    }
}

export function isVideoUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.includes('youtube.com')
            || parsedUrl.hostname.includes('youtu.be')
            || parsedUrl.hostname.includes('vimeo.com');
    } catch {
        return false;
    }
}

export function getEmbedUrl(videoUrl: string): string {
    try {
        const url = new URL(videoUrl);

        // YouTube
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
            const videoId = url.hostname.includes('youtu.be')
                ? url.pathname.slice(1)
                : url.searchParams.get('v');
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Vimeo
        if (url.hostname.includes('vimeo.com')) {
            const videoId = url.pathname.split('/').pop();
            if (videoId) {
                return `https://player.vimeo.com/video/${videoId}`;
            }
        }

        return videoUrl;
    } catch {
        return videoUrl;
    }
} 