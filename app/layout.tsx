import type { Metadata } from "next";
import "./globals.css";
import ReproductorGlobal from "@/components/ReproductorGlobal";
import { ReproductorProvider } from "@/components/ReproductorProvider";

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
      <body className="bg-[#08040C] text-[#F4F0EB] antialiased">
        <ReproductorProvider>
          {children}
          <ReproductorGlobal />
        </ReproductorProvider>
      </body>
    </html>
  );
}