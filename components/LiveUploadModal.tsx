import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  Image as ImageIcon, 
  Video, 
  Heart, 
  Share2, 
  Hash, 
  Upload, 
  Play,
  Pause,
  Maximize2,
  Copy,
  Check,
  Code,
  Mail,
  Facebook,
  Linkedin
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// Custom Icons for Share Menu
const BlueskyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 566 500" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M135.72 44.03c66.496 49.921 113.224 118.839 124.28 155.475 2.601 8.621 4.644 15.179 5.99 21.047 1.346-5.868 3.389-12.426 5.99-21.047 11.056-36.636 57.784-105.554 124.28-155.475 23.243-17.448 135.723-97.051 135.723-12.027 0 26.304-4.253 44.185-9.715 57.175-19.462 46.289-98.384 128.718-124.779 152.884-38.22 34.994-67.434 26.473-20.725 106.775 30.739 52.85 91.564 96.657 122.39 100.957 26.34 3.674 48.973 1.04 43.197-30.081-3.329-17.935-13.623-28.761-19.896-33.879-43.136-35.19-86.328-36.31-103.543-30.569-42.502 14.175-35.592 73.742 22.846 64.954 62.463-9.395 117.84-51.758 134.137-123.288 1.487-6.529 6.25-33.229 2.064-59.563-8.834-55.572-51.488-84.18-87.892-93.571-33.72-8.7-72.336 2.09-106.84 31.81-42.368 36.495-81.565 89.263-100.34 114.735l-15 20.25-15-20.25c-18.775-25.472-57.972-78.24-100.34-114.735-34.504-29.72-73.12-40.51-106.84-31.81-36.404 9.391-79.058 37.999-87.892 93.571-4.186 26.334.577 53.034 2.064 59.563 16.297 71.53 71.674 113.893 134.137 123.288 58.438 8.788 65.348-50.779 22.846-64.954-17.215-5.741-60.407-4.621-103.543 30.569-6.273 5.118-16.567 15.944-19.896 33.879-5.776 31.121 16.857 33.755 43.197 30.081 30.826-4.3 91.651-48.107 122.39-100.957 46.709-80.302 17.495-71.781-20.725-106.775-26.395-24.166-105.317-106.595-124.779-152.884-5.462-12.99-9.715-30.871-9.715-57.175 0-85.024 112.48-5.421 135.723 12.027z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm5.86 8.085-2.004 9.42c-.15.656-.532.818-1.076.51l-2.978-2.193-1.438 1.385c-.159.158-.293.293-.601.293l.215-3.03 5.517-4.992c.24-.213-.053-.332-.373-.12l-6.819 4.292-2.937-.92c-.639-.201-.652-.64.134-.95l11.474-4.425c.531-.192.996.12.887.73z"/>
  </svg>
);

const LiveUploadModal: React.FC = () => {
  const { activeUploadType, setActiveUploadType, t } = useLanguage();
  const [title, setTitle] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Share State
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Reset state when type changes
  useEffect(() => {
    if (activeUploadType) {
      setTitle('');
      setTags([]);
      setTagInput('');
      setIsRecording(false);
      setIsPlaying(false);
      setLiked(false);
      setIsShareOpen(false);
    }
  }, [activeUploadType]);

  if (!activeUploadType) return null;

  const handleClose = () => setActiveUploadType(null);

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Share Options with Dark Mode Support (Warm/Cool Opacity Rule)
  // Cool colors (Blue, Green, Cyan): 60% opacity in dark mode (/60)
  // Neutral colors (Black, Gray): Adjusted to neutral tones
  const shareOptions = [
    { name: 'Bluesky', icon: BlueskyIcon, bg: 'bg-[#0560FF] dark:bg-[#0560FF]/60' }, // Cool
    { name: 'Email', icon: Mail, bg: 'bg-gray-500 dark:bg-neutral-600' }, // Neutral
    { name: 'Embed', icon: Code, bg: 'bg-gray-800 dark:bg-neutral-700' }, // Neutral
    { name: 'Facebook', icon: Facebook, bg: 'bg-[#1877F2] dark:bg-[#1877F2]/60' }, // Cool
    { name: 'LinkedIn', icon: Linkedin, bg: 'bg-[#0A66C2] dark:bg-[#0A66C2]/60' }, // Cool
    { name: 'Telegram', icon: TelegramIcon, bg: 'bg-[#0088cc] dark:bg-[#0088cc]/60' }, // Cool
    { name: 'WhatsApp', icon: WhatsAppIcon, bg: 'bg-[#25D366] dark:bg-[#25D366]/60' }, // Cool
    { name: 'X', icon: XIcon, bg: 'bg-black dark:bg-black' }, // Neutral
  ];

  const handleShare = (platform: string) => {
    let url = '';
    const text = title || 'Check out this live update on SOMOS';
    const currentUrl = shareUrl;

    switch(platform) {
        case 'Embed':
            navigator.clipboard.writeText(`<iframe src="${currentUrl}" width="500" height="600" frameborder="0"></iframe>`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return;
        case 'WhatsApp': url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + currentUrl)}`; break;
        case 'Facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`; break;
        case 'X': url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`; break;
        case 'LinkedIn': url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`; break;
        case 'Email': url = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(currentUrl)}`; break;
        case 'Telegram': url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`; break;
        case 'Bluesky': url = `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + currentUrl)}`; break;
    }
    
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeLabel = () => {
    switch(activeUploadType) {
      case 'audio': return t('upload_audio');
      case 'photo': return t('upload_photos');
      case 'video': return t('upload_video');
      default: return 'Live Upload';
    }
  };

  const renderPreview = () => {
    switch(activeUploadType) {
      case 'audio':
        return (
          <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
             {/* Audio Visualization Bars */}
             <div className="flex items-end justify-center gap-1 h-24 mb-6">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-2 bg-brand-orange dark:bg-brand-orange/70 rounded-t-sm transition-all duration-100 ease-in-out ${isRecording || isPlaying ? 'animate-pulse' : ''}`}
                        style={{ 
                            height: isRecording || isPlaying ? `${Math.random() * 100}%` : '20%',
                            animationDelay: `${i * 0.05}s`
                        }}
                    ></div>
                ))}
             </div>
             
             {/* Control Button */}
             <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
             >
                {isRecording ? (
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                ) : (
                    <Mic className="text-white w-8 h-8" />
                )}
             </button>
             <p className="text-neutral-400 text-xs mt-4 font-mono uppercase tracking-widest">
                {isRecording ? 'Recording 00:04' : 'Ready to Record'}
             </p>
          </div>
        );
      case 'photo':
        return (
          <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer group">
             <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-blue-500 dark:text-blue-500/60 w-8 h-8" />
             </div>
             <span className="text-gray-500 dark:text-neutral-400 text-sm font-medium">Drag & drop or click to upload</span>
          </div>
        );
      case 'video':
        return (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center relative group">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                     <span className="text-white text-xs font-bold uppercase tracking-wider">LIVE CAM</span>
                </div>
                
                {/* Fake Camera Interface */}
                <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none"></div>
                <Maximize2 className="absolute bottom-4 right-4 text-white/50 w-5 h-5" />
                
                <button className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center hover:border-white/60 transition-colors">
                     <div className="w-16 h-16 bg-red-500 dark:bg-red-500/70 rounded-full"></div>
                </button>
            </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                 <h2 className="text-sm font-bold text-gray-900 dark:text-neutral-100 uppercase tracking-wide">
                    {getTypeLabel()}
                 </h2>
            </div>
            <button 
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400 dark:text-neutral-500 transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Small Screen Preview Area */}
        {/* Aspect Ratio 4:5 to mimic a phone screen or social post */}
        <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-black relative">
            {renderPreview()}
        </div>

        {/* Content Form */}
        <div className="p-6 flex flex-col gap-4 flex-grow overflow-y-auto custom-scrollbar relative">
            
            {/* Title Input */}
            <input 
                type="text" 
                placeholder="Write a catchy headline..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg font-bold bg-transparent border-none focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-neutral-700 text-gray-900 dark:text-neutral-100 p-0"
            />

            {/* Tag Input */}
            <div className="flex flex-wrap gap-2 items-center">
                {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-xs font-medium text-gray-600 dark:text-neutral-400">
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={10} /></button>
                    </span>
                ))}
                <div className="flex items-center gap-1 text-gray-400 dark:text-neutral-600 flex-grow">
                    <Hash size={14} />
                    <input 
                        type="text" 
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Add tags..." 
                        className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-gray-600 dark:text-neutral-400 placeholder:text-gray-300 dark:placeholder:text-neutral-700"
                    />
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
                {/* Like Button: Warm Color -> 70% opacity in dark mode */}
                <button 
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-full transition-all ${liked ? 'text-red-500 dark:text-red-500/70 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 dark:text-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800'}`}
                >
                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                </button>
                
                {/* Share Button Wrapper */}
                <div className="relative">
                    <button 
                        onClick={() => setIsShareOpen(!isShareOpen)}
                        className={`p-2 rounded-full transition-all ${isShareOpen ? 'text-blue-500 dark:text-blue-500/60 bg-blue-50 dark:bg-blue-900/20' : 'text-blue-500 dark:text-blue-500/60 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                    >
                        <Share2 size={20} />
                    </button>

                    {/* SHARE POPUP */}
                    {isShareOpen && (
                        <div className="absolute bottom-full left-0 mb-3 w-[290px] sm:w-[320px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-neutral-800 p-4 z-50 animate-in fade-in zoom-in-95 origin-bottom-left cursor-default" onClick={(e) => e.stopPropagation()}>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                            {shareOptions.map((opt) => (
                                <button 
                                    key={opt.name} 
                                    onClick={() => handleShare(opt.name)}
                                    className="flex flex-col items-center gap-1.5 group"
                                >
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200 ${opt.bg}`}>
                                        <opt.icon size={20} className="text-white sm:w-6 sm:h-6" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-medium text-center truncate w-full">{opt.name}</span>
                                </button>
                            ))}
                            </div>

                            {/* Copy Link Section */}
                            <div className="relative flex items-center bg-gray-50 dark:bg-neutral-800 rounded-xl p-1.5 border border-gray-200 dark:border-neutral-700">
                            <div className="flex-1 px-3 overflow-hidden">
                                <input 
                                    readOnly 
                                    value={shareUrl} 
                                    className="w-full bg-transparent border-none outline-none text-xs text-gray-600 dark:text-neutral-300 font-medium truncate"
                                    onClick={(e) => e.currentTarget.select()}
                                />
                            </div>
                            <button 
                                onClick={handleCopyLink}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0 
                                    ${copied 
                                        ? 'bg-emerald-500 dark:bg-emerald-500/60 text-white' 
                                        : 'bg-blue-500 dark:bg-blue-500/60 hover:bg-blue-600 dark:hover:bg-blue-500/80 text-white'}`}
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Publish Button: Gradient with Warm Tones -> 70% opacity in dark mode */}
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-brand-red to-brand-orange dark:from-brand-red/70 dark:to-brand-orange/70 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all">
                <Upload size={16} />
                Publish
            </button>
        </div>

      </div>
    </div>
  );
};

export default LiveUploadModal;