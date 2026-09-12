import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InquiryDrawer from '../components/inquiry/InquiryDrawer';
import { InquiryProvider } from '../context/InquiryContext';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata: Metadata = {

  title: 'FormaTiles | Architectural Surfaces, Tiles, Granite & SPC Showroom',
  description: 'FormaTiles is a modern architectural surface specialist offering premium Ceramic, Granite slabs, 3D Wall Panels, and SPC Flooring with modular calculators and instant WhatsApp quotes.',
  keywords: ['ceramic tiles', 'granite slabs', 'SPC flooring', 'wall panel', 'keramik', 'lantai spc', 'tile calculator'],
  openGraph: {
    title: 'FormaTiles - Architectural Surfaces & Tile Calculator',
    description: 'Explore premium ceramic, granite slabs, acoustic wall panels, and SPC flooring. Calculate boxes and request direct WhatsApp quotes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <LanguageProvider>
          <InquiryProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                {children}
              </main>
              <Footer />
              <InquiryDrawer />
            </div>
          </InquiryProvider>
        </LanguageProvider>
      </body>
    </html>

  );
}
