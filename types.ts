export type Language = 
  | 'Deutsch' 
  | 'English' 
  | 'Español' 
  | 'Français' 
  | 'Português' 
  | '中文'
  | 'Akateko'
  | 'Arawakan'
  | 'Aymara'
  | 'Guarani'
  | "K'iche'"
  | 'Mapudungún'
  | 'Mayan'
  | 'Mixteco Alto'
  | 'Mixteco Bajo'
  | 'Nahuatl'
  | 'Quechua'
  | 'Wayuu';

export type UploadType = 'audio' | 'photo' | 'video' | null;

export interface Article {
  id: number;
  location: string;
  category: string;
  date: string;
  time: string;
  headline: string;
  summary: string;
  imageUrl: string;
  url?: string;
  credibility: string;
  censorship: string;
  source: string;
  verified: boolean;
}