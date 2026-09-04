import type { Metadata } from 'next';
import './globals.css'; // Asegúrate de que esta línea coincide con tu archivo de estilos global

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}