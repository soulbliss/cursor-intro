'use client';

import Script from 'next/script';

// Uses Google Analytics, replace with your own analytics provider

export function Analytics() {
  return (
    <>
      <Script
        defer
        data-domain="cursorintro.com"
        src="https://analytics.deeps.dev/js/script.js"></Script>
    </>
  );
}
