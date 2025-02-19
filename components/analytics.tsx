'use client';

import Script from 'next/script';

export function Analytics() {
  return (
    <>
      <Script
        defer
        data-domain="cursorintro.com"
        src="https://analytics.deeps.dev/js/script.js"></Script>
      <Script id="microsoft-clarity">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "qc6xu4rb1f");
        `}
      </Script>
    </>
  );
}
