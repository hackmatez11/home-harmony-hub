import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Property, FilterOptions, Language, ChatMessage } from '@/types';
import { mockProperties } from '@/data/mockData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  properties: Property[];
  savedProperties: string[];
  filters: FilterOptions;
  language: Language;
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  isVoiceBotOpen: boolean;
  isListening: boolean;
  voiceTranscript: string;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_PROPERTIES'; payload: Property[] }
  | { type: 'TOGGLE_SAVE_PROPERTY'; payload: string }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'CLEAR_CHAT' }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'TOGGLE_VOICEBOT' }
  | { type: 'SET_LISTENING'; payload: boolean }
  | { type: 'SET_VOICE_TRANSCRIPT'; payload: string }
  | { type: 'ADD_PROPERTY'; payload: Property }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'DELETE_PROPERTY'; payload: string };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  properties: mockProperties,
  savedProperties: [],
  filters: {},
  language: 'en',
  chatMessages: [],
  isChatOpen: false,
  isVoiceBotOpen: false,
  isListening: false,
  voiceTranscript: ''
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'TOGGLE_SAVE_PROPERTY':
      const isSaved = state.savedProperties.includes(action.payload);
      return {
        ...state,
        savedProperties: isSaved
          ? state.savedProperties.filter(id => id !== action.payload)
          : [...state.savedProperties, action.payload]
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: {} };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'CLEAR_CHAT':
      return { ...state, chatMessages: [] };
    case 'TOGGLE_CHAT':
      return { ...state, isChatOpen: !state.isChatOpen, isVoiceBotOpen: false };
    case 'TOGGLE_VOICEBOT':
      return { ...state, isVoiceBotOpen: !state.isVoiceBotOpen, isChatOpen: false };
    case 'SET_LISTENING':
      return { ...state, isListening: action.payload };
    case 'SET_VOICE_TRANSCRIPT':
      return { ...state, voiceTranscript: action.payload };
    case 'ADD_PROPERTY':
      return { ...state, properties: [...state.properties, action.payload] };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map(p =>
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string, role?: 'user' | 'agency') => Promise<void>;
  logout: () => void;
  toggleSaveProperty: (propertyId: string) => void;
  setLanguage: (lang: Language) => void;
  sendChatMessage: (content: string) => void;
  startVoiceRecognition: () => void;
  stopVoiceRecognition: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = async (email: string, password: string, role: 'user' | 'agency' = 'user') => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: 'user-1',
      email,
      name: email.split('@')[0],
      role,
      savedProperties: [],
      preferences: {
        language: 'en',
        notifications: true
      },
      agencyId: role === 'agency' ? 'a1' : undefined
    };
    dispatch({ type: 'SET_USER', payload: mockUser });
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  const toggleSaveProperty = (propertyId: string) => {
    dispatch({ type: 'TOGGLE_SAVE_PROPERTY', payload: propertyId });
  };

  const setLanguage = (lang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  const sendChatMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });

    // Simulate AI response
    setTimeout(() => {
      const filteredProperties = state.properties.filter(p =>
        p.title.toLowerCase().includes(content.toLowerCase()) ||
        p.location.city.toLowerCase().includes(content.toLowerCase()) ||
        p.type.toLowerCase().includes(content.toLowerCase())
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: filteredProperties.length > 0
          ? `I found ${filteredProperties.length} properties that match your search. Here are some options:`
          : `I couldn't find properties matching "${content}". Would you like to try a different search or explore our featured listings?`,
        timestamp: new Date().toISOString(),
        propertyCards: filteredProperties.slice(0, 3)
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: assistantMessage });
    }, 1000);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      dispatch({ type: 'SET_LISTENING', payload: true });
      dispatch({ type: 'SET_VOICE_TRANSCRIPT', payload: '' });
    }
  };

  const stopVoiceRecognition = () => {
    dispatch({ type: 'SET_LISTENING', payload: false });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        toggleSaveProperty,
        setLanguage,
        sendChatMessage,
        startVoiceRecognition,
        stopVoiceRecognition
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
