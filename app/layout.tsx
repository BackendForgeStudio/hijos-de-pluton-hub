import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'El Códice de Plutón | Santuario de la Academia Eclipse',
  description: 'El santuario no oficial para los lectores y fans de Los Hijos de Plutón. Descubre a qué Bastión perteneces, calcula tu Carta Astral y explora los archivos clasificados de Asthar.',
  metadataBase: new URL('https://elcodicedepluton.com'), // Asegúrate de que este es tu dominio final
  keywords: ['Hijos de Plutón', 'Academia Eclipse', 'Asthar', 'Fantasía', 'Test Bastiones', 'Grimorio', 'Numi'],
  authors: [{ name: 'Comunidad de Lectores' }],
  openGraph: {
    title: 'El Códice de Plutón | Academia Eclipse',
    description: 'Santuario para fans de Los Hijos de Plutón. Haz la evaluación de contención, descubre tu Ley Numi y sella tu pacto con Asthar.',
    url: 'https://elcodicedepluton.com',
    siteName: 'El Códice de Plutón',
    images: [
      {
        url: '/images/og-eclipse.jpg', 
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
    images: ['/images/og-eclipse.jpg'],
  },
};