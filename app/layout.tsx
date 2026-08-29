import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Códice de Plutón | Santuario Oficial de Los Hijos de Plutón",
  description: "Portal oficial de la novela de fantasía y misterio de Augusta Thoenig y Fran de Solas. Explora el lore de la Academia Eclipse, oráculo diario y comunidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#08040C] text-[#F4F0EB] antialiased">{children}</body>
    </html>
  );
}