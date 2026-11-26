import type { Metadata, Viewport } from "next";
import { ContentProvider } from "@/components/edit/ContentProvider";
import { CreatorUI } from "@/components/creator/CreatorUI";
import { ThemeStyle } from "@/components/ThemeStyle";
import { publicContent } from "@/content/sanitize";
import { getContent } from "@/content/store";
import "./globals.css";

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `${site.name} | Mechanical Engineer, Technical Services & Passive Fire Protection`, template: `%s | ${site.name}` },
    description: site.description,
    openGraph: { type: "website", title: `${site.name} | Mechanical Engineer`, description: site.description, siteName: site.name, locale: "en_AU" },
    twitter: { card: "summary_large_image", title: `${site.name} | Mechanical Engineer`, description: site.description },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = { themeColor: "#111214" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Visitors get the published content; the creator's browser loads the full version (with drafts) after login.
  const content = publicContent(await getContent());
  const { site } = content;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Mechanical Engineer",
    worksFor: { "@type": "Organization", name: "Trafalgar Group" },
    address: { "@type": "PostalAddress", addressLocality: "Sydney", addressCountry: "AU" },
    url: siteUrl(),
    sameAs: [site.linkedin, site.github].filter(Boolean),
  }).replace(/</g, "\\u003c");

  return (
    <html lang="en-AU">
      <body>
        <ContentProvider initial={content}>
          <ThemeStyle />
          <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bronze focus:px-4 focus:py-2 focus:text-ink">
            Skip to content
          </a>
          {children}
          <CreatorUI />
        </ContentProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
