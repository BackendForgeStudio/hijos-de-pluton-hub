'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const academiaFont = localFont({
  src: './fonts/AcademiaEclipse.ttf',
  variable: '--font-academia',
  display: 'swap',
});

// PROFECÍAS CANÓNICAS DE ECLIPSE
const PROFECIAS = [
  "“El don sin control no es más que un arma autodestructiva.” — Profesor Lucio",
  "“La mente humana detesta el vacío. Cuando neutralizamos un recuerdo, el propio cerebro recompone la secuencia.” — Profesor Lucio",
  "“Si no aprendes a dominar esa oscuridad, terminará dominándote a ti.” — Evan",
  "“A veces proteger a alguien implica quitarle algo que no debería haber tenido.” — Cosmo Evren",
  "“La música es la respuesta, lo demás es solo ruido.” — Madame Orwen"
];

// TEST DE INICIACIÓN BASADO EN LOS EVENTOS DE LA NOVELA
const PREGUNTAS_TEST = [
  {
    pregunta: "Suena la alarma de tormenta magnética ultra cósmica en Eclipse y estás en el patio exterior. ¿Qué haces?",
    opciones: [
      { texto: "Embestir las puertas selladas con fuerza bruta o calcinar un refugio provisional.", bastion: "Fuego" },
      { texto: "Buscar a los heridos, usar la niebla para ocultarnos o levantar un campo de fuerza emocional.", bastion: "Agua" },
      { texto: "Mantener la calma, compactar mi energía y bloquear cualquier estructura que colapse.", bastion: "Tierra" },
      { texto: "Alterar la gravedad para huir desde el aire o hackear los sistemas de la academia.", bastion: "Aire" }
    ]
  },
  {
    pregunta: "Estás atrapado en el Laberinto de Asterión y se activa 'El Giro', alterando todos los muros violentamente. Tu instinto te dicta:",
    opciones: [
      { texto: "Lanzar proyectiles destructivos a distancia o iluminar el camino con mi propia luz.", bastion: "Fuego" },
      { texto: "Infiltrarme en las sombras de los muros o despistar a los rivales con ilusiones.", bastion: "Agua" },
      { fractional: false, texto: "Endurecer mi piel para soportar el impacto o inmovilizar los engranajes de piedra.", bastion: "Tierra" },
      { texto: "Desdoblarme en dos cuerpos para explorar varias rutas o cruzar portales.", bastion: "Aire" }
    ]
  },
  {
    pregunta: "Descubres que un Alto Linaje está conspirando contra los Espontáneos. ¿Cómo reaccionas?",
    opciones: [
      { texto: "Confronto a los líderes cara a cara, el combate y la furia dominan mi naturaleza.", bastion: "Fuego" },
      { texto: "Siento las intenciones ocultas de los implicados y actúo guiado por mi intuición.", bastion: "Agua" },
      { texto: "Robo los informes médicos en secreto y organizo una resistencia desde el subsuelo.", bastion: "Tierra" },
      { texto: "Utilizo mi magnetismo y mi elocuencia para averiguar la verdad sin que se den cuenta.", bastion: "Aire" }
    ]
  }
];

const BASTIONES_INFO: Record<string, { nombre: string; descripcion: string; emblema: string; kinesis: string }> = {
  Fuego: {
    nombre: "Bastión de Fuego",
    descripcion: "Tu energía es directa, afilada y letal. El combate y el instinto dominan tu naturaleza. No estás aquí para retroceder, sino para arder sin destruirlo todo.",
    emblema: "🔥 Signos: Aries, Leo, Sagitario",
    kinesis: "Doce Leyes: Pirokinesis, Heliokinesis, Chorokinesis."
  },
  Agua: {
    nombre: "Bastión de Agua",
    descripcion: "Sientes todo a un nivel insoportable. Tu poder transforma las emociones, navega por el mundo de los sueños y es capaz de dominar la oscuridad más profunda.",
    emblema: "💧 Signos: Cáncer, Escorpio, Piscis",
    kinesis: "Doce Leyes: Patokinesis, Umbrakinesis, Onirokinesis."
  },
  Tierra: {
    nombre: "Bastión de Tierra",
    descripcion: "Eres el límite, la estructura y la contención. Tu poder puede estabilizar células vivas, volverte físicamente indestructible o paralizar procesos atómicos.",
    emblema: "🌿 Signos: Tauro, Virgo, Capricornio",
    kinesis: "Doce Leyes: Taurokinesis, Biokinesis, Akinesis."
  },
  Aire: {
    nombre: "Bastión de Aire",
    descripcion: "Eres libre, elocuente y mental. Dominas el espacio, la gravedad, los desdoblamientos de identidad y los flujos eléctricos y tecnológicos.",
    emblema: "🌪️ Signos: Géminis, Libra, Acuario",
    kinesis: "Doce Leyes: Duplikinesis, Gravitokinesis, Electrokinesis."
  }
};

/* --- COMPONENTES VISUALES --- */

const DivisorEstelar = () => (
  <div className="w-full flex justify-center items-center py-8 opacity-80">
    <div className="w-24 md:w-48 h-[1px] bg-gradient-to-r from-transparent to-[#E5C0A1]/50"></div>
    <span className="mx-4 text-[#C8946E] text-sm drop-shadow-[0_0_8px_rgba(200,148,110,0.8)]">✦</span>
    <div className="w-24 md:w-48 h-[1px] bg-gradient-to-l from-transparent to-[#E5C0A1]/50"></div>
  </div>
);

const EsquinasReliquia = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E5C0A1]/50 group-hover:border-[#C8946E] transition-colors duration-300"></div>
  </>
);

const BotonReliquia = ({ children, onClick, type = "button", disabled = false }: { children: React.ReactNode, onClick?: () => void, type?: "button" | "submit", disabled?: boolean }) => (
  <button 
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`relative overflow-hidden px-8 py-3 bg-gradient-to-b from-[#1E0B2B] to-[#0A050E] text-[#F4F0EB] font-bold uppercase tracking-[0.2em] text-xs border border-[#E5C0A1]/40 shadow-[0_0_15px_rgba(76,29,149,0.3)] transition-all duration-500 group ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_25px_rgba(200,148,110,0.5)] hover:border-[#C8946E]'}`}
  >
    {!disabled && <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#E5C0A1]/20 to-transparent -skew-x-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>}
    <span className="relative z-10">{children}</span>
  </button>
);

const IconoSelloArcano = () => (
  <svg className="w-8 h-8 text-[#C8946E] drop-shadow-[0_0_10px_rgba(200,148,110,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 3"/>
    <circle cx="12" cy="12" r="5" strokeWidth="1.5"/>
    <path d="M12 2V5M12 19V22M2 12H5M19 12H22" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

const IconoOraculo = () => (<svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const IconoEclipse = () => (<svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>);
const IconoGrimorio = () => (<svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>);
const IconoEnigma = () => (<svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const IconoGaleria = () => (<svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>);
const IconoFAQ = () => (<svg className="w-5 h-5 text-[#C8946E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>);

export default function CodicePlutonPage() {
  const [profeciaActual, setProfeciaActual] = useState("Pulsa el cristal para invocar tu profecía diaria.");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntosBastion, setPuntosBastion] = useState({ Fuego: 0, Agua: 0, Tierra: 0, Aire: 0 });
  const [bastionResultado, setBastionResultado] = useState<string | null>(null);

  const [respuestaEnigma, setRespuestaEnigma] = useState("");
  const [mensajeEnigma, setMensajeEnigma] = useState("");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  const [particulas, setParticulas] = useState<{ id: number; x: number; y: number; delay: number; duration: number; size: number }[]>([]);

  const [emailPacto, setEmailPacto] = useState("");
  const [estadoPacto, setEstadoPacto] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mensajePacto, setMensajePacto] = useState("");

  useEffect(() => {
    const nuevasParticulas = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800, 
      y: (Math.random() - 0.5) * 400, 
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4, 
      size: Math.random() * 3 + 1.5 
    }));
    setParticulas(nuevasParticulas);

    const targetDate = new Date('2026-11-19T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const consultarOraculo = () => {
    const randomIndex = Math.floor(Math.random() * PROFECIAS.length);
    setProfeciaActual(PROFECIAS[randomIndex]);
  };

  const seleccionarRespuesta = (bastion: string) => {
    const nuevosPuntos = { ...puntosBastion, [bastion]: puntosBastion[bastion as keyof typeof puntosBastion] + 1 };
    setPuntosBastion(nuevosPuntos);

    if (preguntaActual + 1 < PREGUNTAS_TEST.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      const ganadora = Object.keys(nuevosPuntos).reduce((a, b) => 
        nuevosPuntos[a as keyof typeof nuevosPuntos] > nuevosPuntos[b as keyof typeof nuevosPuntos] ? a : b
      );
      setBastionResultado(ganadora);
    }
  };

  const reiniciarTest = () => {
    setPreguntaActual(0);
    setPuntosBastion({ Fuego: 0, Agua: 0, Tierra: 0, Aire: 0 });
    setBastionResultado(null);
  };

  const verificarEnigma = (e: React.FormEvent) => {
    e.preventDefault();
    if (respuestaEnigma.toLowerCase().trim() === "moldavita") {
      setMensajeEnigma("✨ ¡Correcto! La piedra de la interferencia destructiva. Los archivos de Caelus han sido expuestos.");
    } else {
      setMensajeEnigma("❌ Frecuencia errónea. Sigue buscando entre los archivos del laboratorio Evren.");
    }
  };

  const sellarPacto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailPacto) return;

    setEstadoPacto('loading');
    setMensajePacto("Invocando a los astros...");

    try {
      const { error } = await supabase
        .from('pactos')
        .insert([{ email: emailPacto }]);

      if (error) {
        if (error.code === '23505') {
          setMensajePacto("Las estrellas indican que este sello ya ha sido registrado anteriormente.");
        } else {
          setMensajePacto("Hubo una interferencia cósmica. Inténtalo de nuevo.");
        }
        setEstadoPacto('error');
      } else {
        const { data, error: rpcError } = await supabase.rpc('obtener_numero_pacto');
        const numeroIniciado = (!rpcError && data !== null) ? data : "1";

        setMensajePacto(`✨ Pacto sellado. Eres el iniciado oficial número #${numeroIniciado} de la Academia.`);
        setEstadoPacto('success');
        setEmailPacto("");
      }
    } catch (err) {
      setMensajePacto("Error de conexión. Las constelaciones están ocultas.");
      setEstadoPacto('error');
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={`bg-[#08040C] text-[#F4F0EB] min-h-screen selection:bg-[#3B0764] selection:text-white ${academiaFont.className} relative`}>
      
      {/* FONDOS LATERALES MÍSTICOS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.70] mix-blend-screen hidden md:block">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-repeat-y" style={{ backgroundImage: "url('/images/runas-izq.jpg')", backgroundSize: '100% auto', WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)' }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-repeat-y" style={{ backgroundImage: "url('/images/zodiaco-der.jpg')", backgroundSize: '100% auto', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)', maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)' }} />
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#08040C] to-transparent"></div>
      </div>

      {/* 1. HERO ASTRAL */}
      <section className="relative h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden isolate transform-gpu">
        <div className="absolute inset-0 bg-cover bg-center -z-30 opacity-60" style={{ backgroundImage: "url('/fondo-astral.png')" }}></div>

        <motion.img src="/anillo.png" alt="Anillo Astrológico" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 120, ease: "linear" }} style={{ willChange: "transform" }} className="absolute w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] max-w-none -z-20 opacity-85 object-contain pointer-events-none select-none transform-gpu" />

        <div className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] -z-10 flex items-center justify-center pointer-events-none transform-gpu">
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-[#2E1065] to-[#4C1D95] rounded-full blur-[60px] md:blur-[90px] opacity-80"></div>
          <img src="/planeta-oficial.png" alt="Planeta Oficial Los Hijos de Plutón" className="absolute w-full h-full object-contain drop-shadow-[0_0_40px_rgba(76,29,149,0.7)] opacity-95 brightness-90 contrast-125" />
        </div>

        <img src="/estrella.png" alt="Estrella Polar" className="absolute top-[calc(50%-300px)] md:top-[calc(50%-380px)] -translate-y-1/2 w-24 h-24 md:w-40 md:h-40 z-30 drop-shadow-[0_0_25px_rgba(229,192,161,1)] object-contain pointer-events-none" />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-4 transform-gpu">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none z-0">
            {particulas.map((p) => (
              <motion.div key={p.id} className="absolute bg-[#E5C0A1] rounded-full blur-[1px] shadow-[0_0_8px_rgba(229,192,161,0.8)]" style={{ width: p.size, height: p.size, left: '50%', top: '50%' }} initial={{ opacity: 0, x: p.x, y: p.y, scale: 0 }} animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0.5], y: [p.y, p.y - 120], x: [p.x, p.x + (Math.random() * 40 - 20)] }} transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }} />
            ))}
          </div>

          <div className="relative mb-3 grid place-items-center w-full z-10">
            <motion.h1 className="col-start-1 row-start-1 font-normal text-4xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] tracking-wider text-center" animate={{ filter: ["blur(4px) brightness(1)", "blur(14px) brightness(1.6)", "blur(4px) brightness(1)"], opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>EL CÓDICE<br />DE PLUTÓN</motion.h1>
            <h1 className="col-start-1 row-start-1 relative font-normal text-4xl sm:text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5EE] via-[#E5C0A1] to-[#A26D45] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wider text-center">EL CÓDICE<br />DE PLUTÓN</h1>
          </div>
          <p className="relative z-10 text-[#E5C0A1]/90 text-[11px] sm:text-xs md:text-base font-light tracking-[0.2em] uppercase text-center px-2 mt-2 drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]">El santuario para los lectores y fans de Los Hijos de Plutón</p>
        </motion.div>
        
        <div onClick={() => scrollToSection('oraculo-diario')} className="absolute bottom-6 cursor-pointer px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C0A1]/20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:border-[#C8946E]/50 transition-all z-30 group">
          <span className="text-[#C8946E] text-[11px] md:text-xs tracking-widest uppercase font-bold group-hover:drop-shadow-[0_0_8px_rgba(200,148,110,0.8)] transition-all">Desciende a las sombras ✦</span>
        </div>
      </section>

      {/* 2. NAVEGACIÓN ADHESIVA */}
      <nav className="sticky top-0 z-50 bg-[#08040C]/95 backdrop-blur-md border-b border-[#E5C0A1]/20 py-3 px-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex justify-start md:justify-center gap-5 md:gap-8 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#E5C0A1]/80 min-w-max px-2 relative z-10">
          <li onClick={() => scrollToSection('lore')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">La Obra</li>
          <li onClick={() => scrollToSection('oraculo-diario')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Oráculo</li>
          <li onClick={() => scrollToSection('test-casas')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Test Casas</li>
          <li onClick={() => scrollToSection('grimorio')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Grimorio</li>
          <li onClick={() => scrollToSection('enigma')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Enigma</li>
          <li onClick={() => scrollToSection('galeria')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">Galería</li>
          <li onClick={() => scrollToSection('faq')} className="hover:text-[#C8946E] cursor-pointer transition-colors py-1">FAQ</li>
        </ul>
      </nav>

      {/* 3. CUENTA ATRÁS */}
      <section className="py-12 bg-transparent text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#C8946E] text-xs uppercase tracking-[0.4em] mb-4 font-bold flex items-center justify-center gap-2">
            <span>✧</span> Próximo Alineamiento del Eclipse <span>✧</span>
          </p>
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto text-[#F4F0EB]">
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.days}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Días</p>
            </div>
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.hours}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Horas</p>
            </div>
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.minutes}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Min</p>
            </div>
            <div className="bg-black/80 border border-[#E5C0A1]/20 p-3 rounded backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-2xl md:text-3xl font-bold text-[#E5C0A1] drop-shadow-[0_0_5px_rgba(229,192,161,0.5)]">{timeLeft.seconds}</span>
              <p className="text-[9px] tracking-widest uppercase text-[#E5C0A1]/60 mt-1">Seg</p>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 4. CAJAS ASIMÉTRICAS */}
      <section id="lore" className="py-12 px-6 relative overflow-hidden transform-gpu z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#F4F0EB] mb-2 tracking-wider">Los Archivos del Códice</h2>
            <p className="text-[#E5C0A1]/70 text-xs tracking-[0.3em] uppercase">Explora los misterios de la Academia Eclipse</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-300 cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Volumen I</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">La Obra y el Lore</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Descubre la verdad sobre los Espontáneos y el Pacto del Velo.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Leer ✦</span>
            </div>
            
            <div id="merch" className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(229,192,161,0.15)] transition-all duration-300 cursor-pointer md:mt-10" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Artefactos</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">Reliquias y Merch</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Anillos holográficos y ediciones especiales de la obra.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Explorar ✦</span>
            </div>
            
            <div id="discord" className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-300 cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Comunidad</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">El Círculo (Discord)</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Únete a la resistencia secreta de Los Hijos de Plutón.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Unirse ✦</span>
            </div>
            
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(229,192,161,0.15)] transition-all duration-300 cursor-pointer md:mt-14" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.90), rgba(10, 5, 14, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8946E] block mb-2 font-bold">Manuscritos</span>
              <h3 className="text-xl text-[#F4F0EB] mb-2">Capítulos Inéditos</h3>
              <p className="text-[#E5C0A1]/80 text-xs font-light leading-relaxed mb-4">Expedientes clasificados del Consejo de Asthar.</p>
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold group-hover:text-[#F4F0EB] transition-colors">Desvelar ✦</span>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 5. ORÁCULO DIARIO */}
      <section id="oraculo-diario" className="py-12 px-6 text-center transform-gpu relative z-10">
        <div className="max-w-2xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoOraculo /> Consulta Mística <IconoOraculo />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-4">El Oráculo de Plutón</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Pulsa el sello para revelar la advertencia oculta que marcará tu jornada.</p>

          <div className="p-8 border border-[#E5C0A1]/30 mb-8 relative group shadow-[0_0_40px_rgba(46,16,101,0.5)] bg-black/90 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C8946E] to-transparent"></div>
            <EsquinasReliquia />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#4C1D95]/20 blur-2xl rounded-full pointer-events-none"></div>
            
            <p className="text-base md:text-xl text-[#F4F0EB] italic font-light min-h-[60px] flex items-center justify-center relative z-10 drop-shadow-md">
              {profeciaActual}
            </p>
          </div>

          <BotonReliquia onClick={consultarOraculo}>Invocar Profecía</BotonReliquia>
        </div>
      </section>

      <DivisorEstelar />

      {/* 6. TEST DE BASTIONES (NUEVO LORE) */}
      <section id="test-casas" className="py-12 px-6 text-center relative z-10">
        <div className="max-w-xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoEclipse /> Evaluación de Contención <IconoEclipse />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Las Doce Leyes de la Manifestación Natal</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Descubre a qué Bastión de la Academia Eclipse perteneces según tus decisiones ante el peligro.</p>

          <div className="p-8 border border-[#E5C0A1]/30 text-left relative bg-black/90 backdrop-blur-md shadow-[0_0_40px_rgba(76,29,149,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/textura-grimorio.jpg')] opacity-15 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C8946E] to-transparent"></div>
            <EsquinasReliquia />

            {!bastionResultado ? (
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-4 border-b border-[#E5C0A1]/20 pb-3 flex justify-between">
                  <span>Prueba {preguntaActual + 1} de {PREGUNTAS_TEST.length}</span>
                  <span className="text-[#E5C0A1]/50">Registro Central</span>
                </span>
                <h3 className="text-lg md:text-xl text-[#F4F0EB] mb-8 font-light leading-relaxed">{PREGUNTAS_TEST[preguntaActual].pregunta}</h3>
                <div className="space-y-4">
                  {PREGUNTAS_TEST[preguntaActual].opciones.map((opcion, index) => (
                    <button key={index} onClick={() => seleccionarRespuesta(opcion.bastion)} className="w-full text-left p-4 bg-[#140B1A]/80 border border-[#E5C0A1]/20 hover:border-[#C8946E] hover:bg-[#2E1065]/40 text-[#F4F0EB] text-xs md:text-sm transition-all duration-300 cursor-pointer group flex justify-between items-center shadow-inner">
                      <span>{opcion.texto}</span>
                      <span className="text-[#C8946E] opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] block mb-3 font-bold">Destino Revelado</span>
                <h3 className="text-4xl text-[#F4F0EB] mb-3 drop-shadow-lg">{BASTIONES_INFO[bastionResultado].nombre}</h3>
                <p className="text-[#E5C0A1] text-sm mb-2 drop-shadow-[0_0_15px_rgba(229,192,161,0.6)] font-bold">{BASTIONES_INFO[bastionResultado].emblema}</p>
                <p className="text-[#C8946E] text-xs mb-6 font-bold tracking-widest">{BASTIONES_INFO[bastionResultado].kinesis}</p>
                <p className="text-[#E5C0A1]/90 text-sm font-light mb-10 leading-relaxed px-4">{BASTIONES_INFO[bastionResultado].descripcion}</p>
                <BotonReliquia onClick={reiniciarTest}>Repetir Evaluación</BotonReliquia>
              </div>
            )}
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 7. EL GRIMORIO */}
      <section id="grimorio" className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoGrimorio /> Enciclopedia Numi <IconoGrimorio />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Archivos de Asthar</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Expedientes clasificados, Altos Linajes y Mineralogía Avanzada.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] transition-all cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.85), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente I</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium group-hover:text-[#C8946E] transition-colors">Altos Linajes</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Evren, Helion, Aurelis, Vesper y Draken.</p>
            </div>
            <div className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(229,192,161,0.2)] transition-all cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.85), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente II</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium group-hover:text-[#C8946E] transition-colors">Dilución Inversa</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">La verdad genética de los Espontáneos.</p>
            </div>
            <div className="p-6 border border-[#E5C0A1]/30 relative bg-cover bg-center group hover:border-[#C8946E] hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] transition-all cursor-pointer" style={{ backgroundImage: "linear-gradient(to bottom, rgba(14, 7, 20, 0.85), rgba(10, 5, 14, 0.95)), url('/images/textura-grimorio.jpg')" }}>
              <EsquinasReliquia />
              <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold block mb-1">Expediente III</span>
              <h3 className="text-lg text-[#F4F0EB] mb-1 font-medium group-hover:text-[#C8946E] transition-colors">Mineralogía</h3>
              <p className="text-xs text-[#E5C0A1]/70 font-light">Amplificadores astrales y anulación celular.</p>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 8. ENIGMA (ACTUALIZADO CON MOLDAVITA) */}
      <section id="enigma" className="py-12 px-6 text-center relative z-10">
        <div className="max-w-xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoEnigma /> Reto Semanal <IconoEnigma />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">El Enigma del Consejo</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-8">“¿Qué mineral verde de origen meteórico utilizan los Evren para cancelar la frecuencia Numi de los Espontáneos?”</p>
          <form onSubmit={verificarEnigma} className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <input type="text" value={respuestaEnigma} onChange={(e) => setRespuestaEnigma(e.target.value)} placeholder="Palabra secreta..." className="px-6 py-3 bg-black/80 backdrop-blur-md border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] md:w-72 focus:outline-none focus:border-[#C8946E] transition-colors shadow-inner" />
            <BotonReliquia type="submit">Desencriptar</BotonReliquia>
          </form>
          {mensajeEnigma && <p className="text-xs text-[#E5C0A1] p-4 bg-black/90 backdrop-blur-md border border-[#E5C0A1]/30 inline-block shadow-[0_0_20px_rgba(229,192,161,0.15)]">{mensajeEnigma}</p>}
        </div>
      </section>

      <DivisorEstelar />

      {/* 9. GALERÍA DE VISIONES */}
      <section id="galeria" className="py-12 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
            <IconoGaleria /> Archivo Visual <IconoGaleria />
          </span>
          <h2 className="text-3xl text-[#F4F0EB] mb-3">Galería de Asthar</h2>
          <p className="text-[#E5C0A1]/80 text-xs md:text-sm font-light mb-10">Pulsa sobre cualquier visión para observarla a tamaño real.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div onClick={() => setImagenSeleccionada('/images/galeria-1.jpg')} className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300" style={{ backgroundImage: "url('/images/galeria-1.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all"></div>
              <EsquinasReliquia />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena I</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">La Cascada Invertida</h3>
              </div>
            </div>

            <div onClick={() => setImagenSeleccionada('/images/galeria-2.jpg')} className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(229,192,161,0.2)] transition-all duration-300" style={{ backgroundImage: "url('/images/galeria-2.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all"></div>
              <EsquinasReliquia />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena II</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">El Laberinto de Asterión</h3>
              </div>
            </div>

            <div onClick={() => setImagenSeleccionada('/images/galeria-3.jpg')} className="h-64 border border-[#E5C0A1]/30 p-4 flex flex-col justify-end relative bg-cover bg-center group overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#C8946E] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300" style={{ backgroundImage: "url('/images/galeria-3.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all"></div>
              <EsquinasReliquia />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8946E] font-bold">Escena III</span>
                <h3 className="text-sm md:text-base text-[#F4F0EB] font-medium group-hover:text-[#C8946E] transition-colors">Sello de Plutón</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 10. FAQ */}
      <section id="faq" className="py-12 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#C8946E] uppercase tracking-[0.3em] text-xs font-bold mb-3 flex items-center justify-center gap-3">
              <IconoFAQ /> Base de Conocimiento <IconoFAQ />
            </span>
            <h2 className="text-3xl text-[#F4F0EB]">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4 text-xs md:text-sm">
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center shadow-lg" style={{ backgroundImage: "linear-gradient(to bottom, rgba(15, 8, 20, 0.95), rgba(15, 8, 20, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <h3 className="font-medium text-[#F4F0EB] mb-2 text-base">¿Qué es el Pacto del Velo?</h3>
              <p className="text-[#E5C0A1]/80 font-light leading-relaxed">Es el acuerdo histórico que separa el mundo Numi (Asthar) del plano terrestre, prohibiendo la intervención mágica directa en la Tierra para evitar el colapso de ambas realidades.</p>
            </div>
            <div className="p-6 border border-[#E5C0A1]/20 relative bg-cover bg-center shadow-lg" style={{ backgroundImage: "linear-gradient(to bottom, rgba(15, 8, 20, 0.95), rgba(15, 8, 20, 0.98)), url('/images/textura-grimorio.jpg')" }}>
              <h3 className="font-medium text-[#F4F0EB] mb-2 text-base">¿Quiénes son Los Hijos de Plutón?</h3>
              <p className="text-[#E5C0A1]/80 font-light leading-relaxed">Una resistencia oculta en los sótanos de Eclipse fundada originalmente por Dante y ahora liderada por Evan. Su misión es proteger a los Espontáneos de la purga de los Altos Linajes.</p>
            </div>
          </div>
        </div>
      </section>

      <DivisorEstelar />

      {/* 11. CAPTACIÓN */}
      <section className="py-16 px-6 text-center mb-10 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          
          <div className="flex justify-center mb-4">
            <IconoSelloArcano />
          </div>

          <h2 className="text-3xl text-[#F4F0EB] mb-3">Inscripción a la Academia</h2>
          <p className="text-[#E5C0A1]/80 mb-8 font-light text-xs md:text-sm">Sella tu destino antes del 19 de noviembre y prepárate para cruzar el Umbral a Asthar.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={sellarPacto}>
            <input 
              type="email" 
              required
              value={emailPacto}
              onChange={(e) => setEmailPacto(e.target.value)}
              placeholder="tu@correo.com" 
              className="px-6 py-3 bg-black/80 backdrop-blur-md border border-[#E5C0A1]/30 text-xs text-[#F4F0EB] sm:w-80 focus:outline-none focus:border-[#C8946E] transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" 
            />
            <BotonReliquia type="submit" disabled={estadoPacto === 'loading'}>
              {estadoPacto === 'loading' ? 'Invocando...' : 'Sellar Pacto'}
            </BotonReliquia>
          </form>

          {mensajePacto && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`mt-6 text-xs p-4 bg-black/90 backdrop-blur-md border inline-block shadow-[0_0_20px_rgba(0,0,0,0.5)] ${estadoPacto === 'success' ? 'text-[#E5C0A1] border-[#E5C0A1]/50' : 'text-red-400 border-red-900/50'}`}
            >
              {mensajePacto}
            </motion.p>
          )}

        </motion.div>
      </section>

      {/* 12. PIE DE PÁGINA */}
      <footer className="py-12 px-6 bg-black/95 backdrop-blur-lg border-t border-[#E5C0A1]/15 text-center text-[11px] text-[#E5C0A1]/60 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-bold tracking-widest text-[#C8946E] uppercase">EL CÓDICE DE PLUTÓN</p>
          <p className="leading-relaxed font-light">
            Este sitio web es un portal de fans no oficial creado sin ánimo de lucro por y para la comunidad de lectores de la obra literaria <span className="italic">Los Hijos de Plutón</span>, escrita por Augusta Thoenig y Fran de Solas. No está afiliado, respaldado ni asociado oficialmente con los autores ni con la editorial Montena o Penguin Random House. Todos los derechos sobre la propiedad intelectual pertenecen a sus respectivos propietarios legales.
          </p>
          <div className="pt-4 border-t border-[#E5C0A1]/10 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 elcodicedepluton.com — Todos los derechos reservados.</span>
            <span className="tracking-widest uppercase text-[#C8946E]">Santuario de la Academia Eclipse</span>
          </div>
        </div>
      </footer>

      {/* MODAL / VISOR DE IMAGEN */}
      {imagenSeleccionada && (
        <div onClick={() => setImagenSeleccionada(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer">
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={imagenSeleccionada} alt="Visión ampliada" className="max-h-[85vh] max-w-full object-contain border border-[#E5C0A1]/40 shadow-[0_0_50px_rgba(76,29,149,0.5)]" />
            <button onClick={() => setImagenSeleccionada(null)} className="absolute top-2 right-2 bg-black/80 text-[#E5C0A1] border border-[#E5C0A1]/40 px-3 py-1 text-xs uppercase tracking-widest hover:bg-[#C8946E] hover:text-black transition-all cursor-pointer">
              Cerrar ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}