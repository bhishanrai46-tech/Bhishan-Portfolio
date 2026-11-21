import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Mechanical Engineer, Technical Services & Passive Fire Protection`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    title: `${site.name} | Mechanical Engineer`,
    description: site.description,
    siteName: site.name,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image", title: `${site.name} | Mechanical Engineer`, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#111214" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Mechanical Engineer",
  worksFor: { "@type": "Organization", name: "Trafalgar Group" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Technology Sydney" },
    { "@type": "CollegeOrUniversity", name: "Tribhuvan University" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Sydney", addressCountry: "AU" },
  url: site.url,
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bronze focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
