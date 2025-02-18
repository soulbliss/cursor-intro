import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { NavItem } from '@/types/nav';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">

        <span className="hidden font-bold sm:flex">{siteConfig.name}</span>
      </Link>

    </div>
  );
}
