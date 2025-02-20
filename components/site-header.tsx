"use client"
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertTriangle, BookMarked, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname();

  const navigation = [
    {
      href: "/",
      label: "Home",
      icon: Home
    },
    {
      href: "/insights",
      label: "Insights",
      icon: Sparkles
    },
    {
      href: "/best-practices",
      label: "Best Practices",
      icon: BookMarked
    },
    {
      href: "/mistakes-to-avoid",
      label: "Common Mistakes",
      icon: AlertTriangle
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="https://github.com/soulbliss/cursor-intro"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="sm">
                Contribute a Demo
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center space-x-2">
            {navigation.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "p-2",
                  pathname === href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
