import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arbitralis.com.br"),
  title: "Arbitragem para Imobiliárias e Escritórios | Arbitralis",
  description:
    "Resolva conflitos imobiliários e contratuais com arbitragem digital. Tenha custos mais previsíveis, menos burocracia e acompanhamento online.",
  alternates: {
    canonical:
      "https://www.arbitralis.com.br/arbitragem-para-imobiliarias-e-escritorios-de-advocacia",
  },
  openGraph: {
    title: "Arbitragem para Imobiliárias e Escritórios | Arbitralis",
    description:
      "Uma alternativa digital para resolver conflitos imobiliários e contratuais com mais previsibilidade.",
    url: "https://www.arbitralis.com.br/arbitragem-para-imobiliarias-e-escritorios-de-advocacia",
    siteName: "Arbitralis",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Arbitragem digital para imobiliárias e escritórios de advocacia",
  provider: {
    "@type": "Organization",
    name: "Arbitralis",
    url: "https://www.arbitralis.com.br/",
  },
  serviceType: "Administração de procedimentos de arbitragem digital",
  areaServed: "BR",
  audience: [
    { "@type": "BusinessAudience", name: "Imobiliárias" },
    { "@type": "BusinessAudience", name: "Escritórios de advocacia" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
