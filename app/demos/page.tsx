import { Metadata } from "next"
import { DemosContent } from "./demos-content"

export const metadata: Metadata = {
    title: "Video Demos | Cursor Best Tips & Tricks",
    description: "Watch Cursor AI in action with real-world examples and use cases.",
}

export default function DemosPage() {
    return <DemosContent />
} 