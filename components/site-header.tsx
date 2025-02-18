import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';

export async function SiteHeader() {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {/* {!user && (
              <Link href={PATHS.LOGIN} rel="noreferrer" className="mr-4">
                <Button
                  variant={'outline'}
                  data-umami-event="Getting started public"
                  className="ml-2 w-full whitespace-nowrap font-medium">
                  Login
                </Button>
              </Link>
            )}
            {user && (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            )} */}
          </nav>
          <Link
            href="https://github.com/soulbliss/cursor-intro"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" className="ml-2">
              Contribute a Demo
            </Button>
          </Link>
          {/* {siteConfig.mainNav?.length ? (
            <nav className="hidden gap-6 sm:flex">
              {siteConfig.mainNav?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        'flex items-center text-sm font-medium text-muted-foreground',
                      )}>
                      {item.title}
                    </Link>
                  ),
              )}
            </nav>
          ) : null} */}
        </div>
      </div>
    </header>
  );
}
