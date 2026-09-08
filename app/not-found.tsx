import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#08040C] text-[#F4F0EB] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Fondo ambiental de alerta */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.15)_0%,rgba(8,4,12,1)_70%)]"></div>
      </div>

      {/* Contenedor del aviso clasificado */}
      <div className="relative z-10 text-center max-w-lg mx-auto border border-red-900/50 bg-[#0A050E]/90 p-10 md:p-14 shadow-[0_0_50px_rgba(153,27,27,0.2)] backdrop-blur-md">
        
        {/* Esquinas tácticas */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-900/70"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-900/70"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-900/70"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-900/70"></div>

        {/* Icono de advertencia */}
        <div className="flex justify-center mb-6">
          <svg className="w-10 h-10 text-red-500/80 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-3 block font-bold">
          Error Crítico 404
        </span>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#F4F0EB] mb-6 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(153,27,27,0.5)]">
          Acceso Denegado
        </h1>
        
        <div className="w-12 h-px bg-red-900/50 mx-auto mb-6"></div>
        
        <p className="text-[#E5C0A1]/80 text-xs md:text-sm leading-relaxed mb-10 font-light tracking-wide">
          El directorio que intentas consultar ha sido encriptado, purgado por el Consejo, o tu actual <span className="text-red-400 font-medium">Nivel de Amenaza</span> es insuficiente para visualizarlo.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center border border-[#C8946E]/50 text-[#C8946E] px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-[#C8946E]/10 hover:border-[#C8946E] hover:text-[#F4F0EB] transition-all duration-300"
        >
          ← Regresar al Santuario
        </Link>
      </div>
    </main>
  );
}