import { Metadata } from "next"
import { DemosContent } from "./demos-content"

export const metadata: Metadata = {
    title: "Video Demos | Cursor Best Tips & Tricks",
    description: "Watch Cursor AI in action with real-world examples and use cases.",
    alternates: {
        canonical: "https://cursorintro.com/demos",
    },
    openGraph: {
        title: "Video Demos | Cursor Best Tips & Tricks",
        description: "Watch Cursor AI in action with real-world examples and use cases.",
        type: "website",
        url: "https://cursorintro.com/demos",
        images: 'https://cdn.diligenceai.dev/assets/cursor-intro.webp',
    },
    twitter: {
        card: "summary_large_image",
        title: "Video Demos | Cursor Best Tips & Tricks",
        description: "Watch Cursor AI in action with real-world examples and use cases.",
        images: 'https://cdn.diligenceai.dev/assets/cursor-intro.webp',
    },
}

export default function DemosPage() {
    return <DemosContent />
} 