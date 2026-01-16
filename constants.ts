import { Article, Language } from './types';

export const GLOBAL_LANGUAGES: Language[] = [
  'Deutsch', 'English', 'Español', 'Français', 'Português', '中文'
];

export const INDIGENOUS_LANGUAGES: Language[] = [
  'Akateko', 'Arawakan', 'Aymara', 'Guarani', "K'iche'", 'Mapudungún',
  'Mayan', 'Mixteco Alto', 'Mixteco Bajo', 'Nahuatl', 'Quechua', 'Wayuu'
];

export const TRANSLATION_LANGUAGES = ['Original', ...GLOBAL_LANGUAGES, ...INDIGENOUS_LANGUAGES];

export const COUNTRIES = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 
  'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 
  'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 
  'Perú', 'República Dominicana', 'Uruguay', 'Venezuela'
];

export const UI_TEXT = {
  Español: {
    latin_america: "Latinoamérica",
    tagline1: "Noticias en tiempo real desde Latinoamérica.",
    languages: "IDIOMAS",
    theme_toggle: "Oscuro/Claro",
    live: "En Vivo",
    upload_audio: "Subir Audio",
    upload_photos: "Subir Fotos",
    upload_video: "Subir Video",
    country: "PAÍS",
    all_latin_america: "TODA AMÉRICA LATINA",
    // FIXED: Added all country keys to map correctly in the dropdown
    countries: { 
      'All Latin America': 'Toda América Latina',
      'Argentina': 'Argentina',
      'Bolivia': 'Bolivia',
      'Brasil': 'Brasil',
      'Chile': 'Chile',
      'Colombia': 'Colombia',
      'Costa Rica': 'Costa Rica',
      'Cuba': 'Cuba',
      'Ecuador': 'Ecuador',
      'El Salvador': 'El Salvador',
      'Guatemala': 'Guatemala',
      'Honduras': 'Honduras',
      'México': 'México',
      'Nicaragua': 'Nicaragua',
      'Panamá': 'Panamá',
      'Paraguay': 'Paraguay',
      'Perú': 'Perú',
      'República Dominicana': 'República Dominicana',
      'Uruguay': 'Uruguay',
      'Venezuela': 'Venezuela'
    },
    tabs: { 
      Todas: 'Todas', 
      Politica: 'Política', 
      Negocios: 'Negocios', 
      Salud: 'Salud',
      Arte: 'Arte',
      Ciencias: 'Ciencias',
      Clima: 'Clima',
      Comunidades: 'Comunidades',
      Deportes: 'Deportes',
      Derechos: 'Derechos',
      Educacion: 'Educación',
      LGBTQ: 'LGBTQ'
    },
    art_submenu: {
      dance: "Danza",
      film: "Cine",
      literature: "Literatura",
      music: "Música",
      television: "TV",
      theater: "Teatro",
      visual_arts: "Artes Visuales"
    },
    business_submenu: {
      economy: "Economía",
      finance: "Finanzas",
      markets: "Mercados",
      technology: "Tecnología"
    },
    network_active: "RED DESCENTRALIZADA: ACTIVA",
    footer: "© 2025 SOMOS América Latina.",
    panic: { title: "¡Oops!", desc: "Meditando...", button: "Volver" },
    credibility: "Credibilidad",
    censorship: "Censura",
    read_more: "Leer más",
    read_less: "Leer menos",
    source: "Fuente",
    comments: { title: "Comentarios", placeholder: "Añadir un comentario..." },
    credibility_levels: { HIGH: "ALTA", MEDIUM: "MEDIA", LOW: "BAJA" },
    censorship_levels: { HIGH: "ALTA", MODERATE: "MODERADA", LOW: "BAJA" },
    news: { verified: "Verificado", readMore: "Leer más" }
  },
  English: {
    latin_america: "Latin America",
    tagline1: "Real-time news from Latin America.",
    languages: "LANGUAGES",
    theme_toggle: "Dark/Light",
    live: "Live",
    upload_audio: "Upload Audio",
    upload_photos: "Upload Photos",
    upload_video: "Upload Video",
    country: "COUNTRY",
    all_latin_america: "ALL LATIN AMERICA",
    // FIXED: Added all country keys for English
    countries: { 
      'All Latin America': 'All Latin America',
      'Argentina': 'Argentina',
      'Bolivia': 'Bolivia',
      'Brasil': 'Brazil',
      'Chile': 'Chile',
      'Colombia': 'Colombia',
      'Costa Rica': 'Costa Rica',
      'Cuba': 'Cuba',
      'Ecuador': 'Ecuador',
      'El Salvador': 'El Salvador',
      'Guatemala': 'Guatemala',
      'Honduras': 'Honduras',
      'México': 'Mexico',
      'Nicaragua': 'Nicaragua',
      'Panamá': 'Panama',
      'Paraguay': 'Paraguay',
      'Perú': 'Peru',
      'República Dominicana': 'Dominican Republic',
      'Uruguay': 'Uruguay',
      'Venezuela': 'Venezuela'
    },
    tabs: { 
      Todas: 'All', 
      Politica: 'Politics', 
      Negocios: 'Business', 
      Salud: 'Health',
      Arte: 'Art',
      Ciencias: 'Science',
      Clima: 'Climate',
      Comunidades: 'Communities',
      Deportes: 'Sports',
      Derechos: 'Rights',
      Educacion: 'Education',
      LGBTQ: 'LGBTQ'
    },
    art_submenu: {
      dance: "Dance",
      film: "Film",
      literature: "Literature",
      music: "Music",
      television: "TV",
      theater: "Theater",
      visual_arts: "Visual Arts"
    },
    business_submenu: {
      economy: "Economy",
      finance: "Finance",
      markets: "Markets",
      technology: "Technology"
    },
    network_active: "DECENTRALIZED NETWORK: ACTIVE",
    footer: "© 2025 SOMOS Latin America.",
    panic: { title: "Oops!", desc: "Meditating...", button: "Back" },
    credibility: "Credibility",
    censorship: "Censorship",
    read_more: "Read more",
    read_less: "Read less",
    source: "Source",
    comments: { title: "Comments", placeholder: "Add a comment..." },
    credibility_levels: { HIGH: "HIGH", MEDIUM: "MEDIUM", LOW: "LOW" },
    censorship_levels: { HIGH: "HIGH", MODERATE: "MODERATE", LOW: "LOW" },
    news: { verified: "Verified", readMore: "Read more" }
  }
};