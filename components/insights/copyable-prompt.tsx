"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { useState } from "react"

interface CopyablePromptProps {
    prompt: string
}

export function CopyablePrompt({ prompt }: CopyablePromptProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(prompt)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <Card className="relative p-6">
            <h2 className="text-2xl font-semibold mb-4">Prompt</h2>
            <div className="bg-muted p-4 rounded-md relative">
                <pre className="text-sm whitespace-pre-wrap font-mono">{prompt}</pre>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-4 right-4 bg-background hover:bg-accent"
                    onClick={copyToClipboard}
                >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy prompt</span>
                </Button>
            </div>
            {copied && (
                <div className="absolute bottom-8 right-8 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                    Copied!
                </div>
            )}
        </Card>
    )
} 