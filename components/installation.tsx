'use client';

import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface InstallationProps {
    url: string;
}

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function Installation({ url }: InstallationProps) {
    const [activeTab, setActiveTab] = useState<PackageManager>('pnpm');
    const [copied, setCopied] = useState(false);

    const commands: Record<PackageManager, string> = {
        npm: `npx shadcn@latest add ${url}`,
        pnpm: `pnpm dlx shadcn@latest add ${url}`,
        yarn: `yarn dlx shadcn@latest add ${url}`,
        bun: `bunx --bun shadcn@latest add ${url}`,
    };

    const copyCommand = () => {
        navigator.clipboard.writeText(commands[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 overflow-hidden rounded-lg border bg-neutral-950">
            <div className="flex">
                {(Object.keys(commands) as PackageManager[]).map((pm) => (
                    <button
                        key={pm}
                        onClick={() => setActiveTab(pm)}
                        className={cn(
                            "px-3 py-2 text-xs font-medium transition-colors border-b-2",
                            activeTab === pm
                                ? "border-white text-white"
                                : "border-transparent text-neutral-400 hover:text-neutral-200"
                        )}
                    >
                        {pm}
                    </button>
                ))}
            </div>
            <div className="relative bg-neutral-900">
                <pre className="overflow-x-auto p-4 text-sm text-white">
                    <code>{commands[activeTab]}</code>
                </pre>
                <button
                    onClick={copyCommand}
                    className="absolute right-4 top-4 rounded-md p-1 text-neutral-400 transition-colors hover:text-white"
                    title="Copy to clipboard"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            </div>
        </div>
    );
} 