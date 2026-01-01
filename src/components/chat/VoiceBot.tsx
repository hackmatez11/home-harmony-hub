import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Volume2, VolumeX, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import PropertyCard from '@/components/properties/PropertyCard';

const languages = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
];

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionClass {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event & { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
}

export default function VoiceBot() {
  const { state, dispatch } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof state.properties>([]);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const win = window as Window & typeof globalThis & { 
      webkitSpeechRecognition?: SpeechRecognitionClass;
      SpeechRecognition?: SpeechRecognitionClass;
    };
    
    if (win.webkitSpeechRecognition || win.SpeechRecognition) {
      const SpeechRecognitionConstructor = win.webkitSpeechRecognition || win.SpeechRecognition;
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const result = event.results[current];
          const transcriptText = result[0].transcript;
          setTranscript(transcriptText);

          if (result.isFinal) {
            handleVoiceSearch(transcriptText);
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  const handleVoiceSearch = (query: string) => {
    setIsProcessing(true);
    
    // Simulate search
    setTimeout(() => {
      const results = state.properties.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.city.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsProcessing(false);

      // Voice output
      if (voiceOutputEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          results.length > 0
            ? `I found ${results.length} properties matching your search for ${query}`
            : `I couldn't find any properties matching ${query}. Would you like to try another search?`
        );
        utterance.lang = selectedLanguage;
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      setSearchResults([]);
    }
  };

  if (!state.isVoiceBotOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
            <Mic className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">Voice Search</h3>
            <p className="text-xs text-primary-foreground/70">Speak to find properties</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch({ type: 'TOGGLE_VOICEBOT' })}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
          className={cn(!voiceOutputEnabled && 'text-muted-foreground')}
        >
          {voiceOutputEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        {!isListening && !isProcessing && searchResults.length === 0 && !transcript && (
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Tap the microphone and speak to search for properties
            </p>
            <p className="text-sm text-muted-foreground">
              Try: "Show me villas in Miami" or "Apartments with 3 bedrooms"
            </p>
          </div>
        )}

        {isListening && (
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
              </div>
            </div>
            <p className="font-medium text-primary">Listening...</p>
            {transcript && (
              <p className="mt-4 text-lg">{transcript}</p>
            )}
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Processing your request...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="w-full space-y-4 overflow-y-auto">
            <p className="text-center text-sm text-muted-foreground">
              Found {searchResults.length} properties for "{transcript}"
            </p>
            {searchResults.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} variant="compact" />
            ))}
          </div>
        )}

        {!isProcessing && transcript && searchResults.length === 0 && (
          <div className="text-center">
            <p className="text-muted-foreground">
              No properties found for "{transcript}"
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term
            </p>
          </div>
        )}
      </div>

      {/* Mic Button */}
      <div className="border-t border-border p-6">
        <div className="flex justify-center">
          <Button
            onClick={toggleListening}
            disabled={isProcessing}
            className={cn(
              'h-20 w-20 rounded-full transition-all duration-300',
              isListening
                ? 'bg-destructive hover:bg-destructive/90 pulse-glow'
                : 'hero-gradient hover:opacity-90'
            )}
          >
            {isListening ? (
              <MicOff className="h-8 w-8 text-destructive-foreground" />
            ) : (
              <Mic className="h-8 w-8 text-primary-foreground" />
            )}
          </Button>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {isListening ? 'Tap to stop' : 'Tap to speak'}
        </p>
      </div>
    </div>
  );
}
