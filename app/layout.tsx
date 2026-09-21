import type { Metadata } from 'next';
import './globals.css';
import { ReproductorProvider } from '../components/ReproductorProvider';
import ReproductorGlobal from '../components/ReproductorGlobal';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'El Códice de Plutón | Santuario de la Academia Eclipse',
  description: 'Santuario no oficial para los lectores y fans de Los Hijos de Plutón. Descubre a qué Bastión perteneces, calcula tu Carta Astral y explora los archivos de Asthar.',
  metadataBase: new URL('https://elcodicedepluton.com'),
  keywords: ['Hijos de Plutón', 'Academia Eclipse', 'Asthar', 'Fantasía', 'Test Bastiones', 'Grimorio', 'Numi'],
  authors: [{ name: 'Comunidad de Lectores' }],
  openGraph: {
    title: 'El Códice de Plutón | Academia Eclipse',
    description: 'Santuario fan de Los Hijos de Plutón. Haz la evaluación de contención, descubre tu Ley Numi y sella tu pacto con Asthar.',
    url: 'https://elcodicedepluton.com',
    siteName: 'El Códice de Plutón',
    images: [
      {
        url: 'https://elcodicedepluton.com/images/og-eclipse.jpg', 
        width: 1200,
        height: 630,
        alt: 'Vista monumental de la Academia Eclipse - El Códice de Plutón',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Códice de Plutón | Santuario Fan',
    description: 'El santuario de los lectores de Los Hijos de Plutón. Descubre tu Bastión y tu Carta Astral.',
    images: ['https://elcodicedepluton.com/images/og-eclipse.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased flex flex-col min-h-screen">
        <ReproductorProvider>
          <div className="flex-grow">
            {children}
          </div>
          
          {/* AVISO LEGAL REFORZADO PARA LA EDITORIAL + CONTACTO */}
          <footer className="w-full border-t border-[#E5C0A1]/15 bg-[#08040C] py-10 px-6 relative z-20 mt-auto">
            <div className="max-w-4xl mx-auto text-center">
              
              <span className="text-red-400 font-mono text-[9px] uppercase tracking-[0.3em] block mb-4 border border-red-900/50 bg-red-950/20 py-1.5 px-4 max-w-max mx-auto rounded-sm">
                Proyecto No Oficial
              </span>
              
              <p className="text-[#E5C0A1]/70 text-xs md:text-sm font-light leading-relaxed mb-4">
                El Códice de Plutón es un santuario interactivo sin ánimo de lucro creado <strong className="text-[#E5C0A1] font-medium">exclusivamente de fans para fans</strong>. 
              </p>
              
              <p className="text-[#E5C0A1]/50 text-[10px] font-light leading-relaxed mb-6">
                Esta plataforma no está administrada, afiliada ni respaldada comercialmente por el sello Montena, Penguin Random House Grupo Editorial ni sus autores. Todos los nombres, personajes, lugares y marcas registradas pertenecientes al universo de <span className="italic">Los Hijos de Plutón</span> y <span className="italic">Asthar</span> son propiedad intelectual exclusiva de Augusta Thoenig y Fran de Solas.
              </p>

              {/* SECCIÓN DE CONTACTO */}
              <div className="pt-6 border-t border-[#E5C0A1]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#E5C0A1]/70">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                  <span>Contacto: <a href="mailto:contacto@elcodicedepluton.com" className="text-[#C8946E] hover:text-[#F4F0EB] transition-colors">contacto@elcodicedepluton.com</a></span>
                  <span className="hidden md:inline text-[#E5C0A1]/30">|</span>
                  <span>Comunidad: <a href="https://discord.gg/SZjJthfvKP" target="_blank" rel="noopener noreferrer" className="text-[#C8946E] hover:text-[#F4F0EB] transition-colors">Discord Oficial</a></span>
                </div>
                <span className="tracking-widest uppercase text-[#C8946E]">© 2026 Academia Eclipse</span>
              </div>

            </div>
          </footer>

          <ReproductorGlobal />
        </ReproductorProvider>
        <Analytics />
      </body>
    </html>
  );
}