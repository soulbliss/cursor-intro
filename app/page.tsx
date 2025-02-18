'use client';

import { CategoryGrid } from "@/components/category-grid";
import { SearchBar } from "@/components/search-bar";
import categories from "@/config/categories.json";
import { allTips } from "content-collections";
import { useState } from "react";

export default function IndexPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <section className="space-y-8 pb-12 pt-8 md:pb-16 md:pt-12 lg:py-16">
        <div className="container flex max-w-6xl flex-col items-center gap-8 text-center">
          <h1 className="font-sans text-3xl font-bold tracking-tighter sm:text-5xl md:text-3xl lg:text-4xl">
            Cursor Tips & Tricks
          </h1>
          <div className="container mx-auto w-full max-w-3xl px-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </div>

          <p className="max-w-2xl font-display leading-normal text-sm text-muted-foreground sm:text-lg sm:leading-8">
            Quick video tutorials and screenshots to help you master Cursor. Short and focused tips to get you started.
          </p>

        </div>
      </section>


      <CategoryGrid
        tips={allTips}
        categories={categories}
        searchQuery={searchQuery}
      />
    </>
  );
}
