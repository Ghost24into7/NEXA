import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'

export type ThemePreset =
  | 'default'
  | 'glassmorphism'
  | 'amoled'
  | 'retro-hp'
  | 'nord'
  | 'dracula'
  | 'solarized-light'
  | 'solarized-dark'
  | 'monokai'
  | 'gruvbox'
  | 'dyslexia-friendly'
  | 'high-contrast'

export interface Theme {
  id: string
  name: string
  preset: ThemePreset
  colors: {
    background: string
    foreground: string
    primary: string
    secondary: string
    accent: string
    muted: string
    border: string
    display: string
    displayText: string
    buttonBg: string
    buttonHover: string
    buttonActive: string
    operatorBg: string
    operatorHover: string
    numberBg: string
    numberHover: string
  }
  effects: {
    blur: boolean
    glow: boolean
    shadows: boolean
    animations: boolean
  }
}

export const themes: Record<ThemePreset, Theme> = {
  default: {
    id: 'default',
    name: 'Default',
    preset: 'default',
    colors: {
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(222.2 84% 4.9%)',
      primary: 'hsl(221.2 83.2% 53.3%)',
      secondary: 'hsl(210 40% 96.1%)',
      accent: 'hsl(210 40% 96.1%)',
      muted: 'hsl(210 40% 96.1%)',
      border: 'hsl(214.3 31.8% 91.4%)',
      display: 'hsl(0 0% 98%)',
      displayText: 'hsl(222.2 84% 4.9%)',
      buttonBg: 'hsl(210 40% 96.1%)',
      buttonHover: 'hsl(210 40% 90%)',
      buttonActive: 'hsl(210 40% 85%)',
      operatorBg: 'hsl(221.2 83.2% 53.3%)',
      operatorHover: 'hsl(221.2 83.2% 48%)',
      numberBg: 'hsl(0 0% 98%)',
      numberHover: 'hsl(0 0% 95%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: true,
      animations: true,
    },
  },
  glassmorphism: {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    preset: 'glassmorphism',
    colors: {
      background: 'rgba(255, 255, 255, 0.1)',
      foreground: 'hsl(0 0% 10%)',
      primary: 'rgba(99, 102, 241, 0.8)',
      secondary: 'rgba(168, 85, 247, 0.6)',
      accent: 'rgba(236, 72, 153, 0.6)',
      muted: 'rgba(148, 163, 184, 0.3)',
      border: 'rgba(255, 255, 255, 0.2)',
      display: 'rgba(255, 255, 255, 0.15)',
      displayText: 'hsl(0 0% 10%)',
      buttonBg: 'rgba(255, 255, 255, 0.1)',
      buttonHover: 'rgba(255, 255, 255, 0.2)',
      buttonActive: 'rgba(255, 255, 255, 0.3)',
      operatorBg: 'rgba(99, 102, 241, 0.3)',
      operatorHover: 'rgba(99, 102, 241, 0.5)',
      numberBg: 'rgba(255, 255, 255, 0.05)',
      numberHover: 'rgba(255, 255, 255, 0.15)',
    },
    effects: {
      blur: true,
      glow: true,
      shadows: true,
      animations: true,
    },
  },
  amoled: {
    id: 'amoled',
    name: 'AMOLED Black',
    preset: 'amoled',
    colors: {
      background: 'hsl(0 0% 0%)',
      foreground: 'hsl(0 0% 100%)',
      primary: 'hsl(142 76% 36%)',
      secondary: 'hsl(240 5% 10%)',
      accent: 'hsl(142 76% 36%)',
      muted: 'hsl(240 4% 16%)',
      border: 'hsl(240 4% 16%)',
      display: 'hsl(0 0% 5%)',
      displayText: 'hsl(142 76% 36%)',
      buttonBg: 'hsl(240 5% 10%)',
      buttonHover: 'hsl(240 5% 15%)',
      buttonActive: 'hsl(240 5% 20%)',
      operatorBg: 'hsl(142 76% 20%)',
      operatorHover: 'hsl(142 76% 25%)',
      numberBg: 'hsl(0 0% 8%)',
      numberHover: 'hsl(0 0% 12%)',
    },
    effects: {
      blur: false,
      glow: true,
      shadows: false,
      animations: true,
    },
  },
  'retro-hp': {
    id: 'retro-hp',
    name: 'Retro HP-42S',
    preset: 'retro-hp',
    colors: {
      background: 'hsl(200 20% 15%)',
      foreground: 'hsl(45 100% 70%)',
      primary: 'hsl(45 100% 60%)',
      secondary: 'hsl(200 20% 25%)',
      accent: 'hsl(160 100% 40%)',
      muted: 'hsl(200 10% 35%)',
      border: 'hsl(200 20% 30%)',
      display: 'hsl(120 100% 20%)',
      displayText: 'hsl(120 100% 70%)',
      buttonBg: 'hsl(200 20% 25%)',
      buttonHover: 'hsl(200 20% 30%)',
      buttonActive: 'hsl(200 20% 35%)',
      operatorBg: 'hsl(35 100% 40%)',
      operatorHover: 'hsl(35 100% 45%)',
      numberBg: 'hsl(200 15% 20%)',
      numberHover: 'hsl(200 15% 25%)',
    },
    effects: {
      blur: false,
      glow: true,
      shadows: true,
      animations: false,
    },
  },
  nord: {
    id: 'nord',
    name: 'Nord',
    preset: 'nord',
    colors: {
      background: 'hsl(220 16% 22%)',
      foreground: 'hsl(218 27% 94%)',
      primary: 'hsl(213 32% 52%)',
      secondary: 'hsl(220 17% 32%)',
      accent: 'hsl(179 25% 65%)',
      muted: 'hsl(220 16% 36%)',
      border: 'hsl(220 16% 36%)',
      display: 'hsl(220 16% 28%)',
      displayText: 'hsl(218 27% 94%)',
      buttonBg: 'hsl(220 17% 32%)',
      buttonHover: 'hsl(220 17% 38%)',
      buttonActive: 'hsl(220 17% 44%)',
      operatorBg: 'hsl(213 32% 52%)',
      operatorHover: 'hsl(213 32% 58%)',
      numberBg: 'hsl(220 16% 28%)',
      numberHover: 'hsl(220 16% 34%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: true,
      animations: true,
    },
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    preset: 'dracula',
    colors: {
      background: 'hsl(231 15% 18%)',
      foreground: 'hsl(60 30% 96%)',
      primary: 'hsl(326 100% 74%)',
      secondary: 'hsl(232 14% 31%)',
      accent: 'hsl(135 94% 65%)',
      muted: 'hsl(230 15% 30%)',
      border: 'hsl(232 14% 31%)',
      display: 'hsl(231 15% 22%)',
      displayText: 'hsl(60 30% 96%)',
      buttonBg: 'hsl(232 14% 31%)',
      buttonHover: 'hsl(232 14% 38%)',
      buttonActive: 'hsl(232 14% 45%)',
      operatorBg: 'hsl(326 100% 50%)',
      operatorHover: 'hsl(326 100% 60%)',
      numberBg: 'hsl(231 15% 25%)',
      numberHover: 'hsl(231 15% 30%)',
    },
    effects: {
      blur: false,
      glow: true,
      shadows: true,
      animations: true,
    },
  },
  'solarized-light': {
    id: 'solarized-light',
    name: 'Solarized Light',
    preset: 'solarized-light',
    colors: {
      background: 'hsl(44 87% 94%)',
      foreground: 'hsl(192 81% 14%)',
      primary: 'hsl(205 69% 49%)',
      secondary: 'hsl(44 87% 86%)',
      accent: 'hsl(68 100% 30%)',
      muted: 'hsl(44 11% 93%)',
      border: 'hsl(44 10% 85%)',
      display: 'hsl(44 87% 90%)',
      displayText: 'hsl(192 81% 14%)',
      buttonBg: 'hsl(44 87% 86%)',
      buttonHover: 'hsl(44 87% 80%)',
      buttonActive: 'hsl(44 87% 74%)',
      operatorBg: 'hsl(205 69% 49%)',
      operatorHover: 'hsl(205 69% 55%)',
      numberBg: 'hsl(44 87% 92%)',
      numberHover: 'hsl(44 87% 88%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: true,
      animations: true,
    },
  },
  'solarized-dark': {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    preset: 'solarized-dark',
    colors: {
      background: 'hsl(192 100% 11%)',
      foreground: 'hsl(44 87% 94%)',
      primary: 'hsl(205 69% 49%)',
      secondary: 'hsl(192 90% 13%)',
      accent: 'hsl(68 100% 30%)',
      muted: 'hsl(192 15% 20%)',
      border: 'hsl(192 15% 20%)',
      display: 'hsl(192 100% 8%)',
      displayText: 'hsl(44 87% 94%)',
      buttonBg: 'hsl(192 90% 13%)',
      buttonHover: 'hsl(192 90% 18%)',
      buttonActive: 'hsl(192 90% 23%)',
      operatorBg: 'hsl(205 69% 40%)',
      operatorHover: 'hsl(205 69% 45%)',
      numberBg: 'hsl(192 100% 9%)',
      numberHover: 'hsl(192 100% 12%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: true,
      animations: true,
    },
  },
  monokai: {
    id: 'monokai',
    name: 'Monokai',
    preset: 'monokai',
    colors: {
      background: 'hsl(70 8% 15%)',
      foreground: 'hsl(60 30% 96%)',
      primary: 'hsl(31 100% 71%)',
      secondary: 'hsl(70 8% 20%)',
      accent: 'hsl(81 88% 67%)',
      muted: 'hsl(70 8% 25%)',
      border: 'hsl(70 8% 25%)',
      display: 'hsl(70 8% 12%)',
      displayText: 'hsl(60 30% 96%)',
      buttonBg: 'hsl(70 8% 20%)',
      buttonHover: 'hsl(70 8% 26%)',
      buttonActive: 'hsl(70 8% 32%)',
      operatorBg: 'hsl(31 100% 50%)',
      operatorHover: 'hsl(31 100% 60%)',
      numberBg: 'hsl(70 8% 18%)',
      numberHover: 'hsl(70 8% 23%)',
    },
    effects: {
      blur: false,
      glow: true,
      shadows: true,
      animations: true,
    },
  },
  gruvbox: {
    id: 'gruvbox',
    name: 'Gruvbox',
    preset: 'gruvbox',
    colors: {
      background: 'hsl(0 0% 16%)',
      foreground: 'hsl(43 11% 84%)',
      primary: 'hsl(39 67% 69%)',
      secondary: 'hsl(0 0% 22%)',
      accent: 'hsl(104 41% 59%)',
      muted: 'hsl(0 0% 28%)',
      border: 'hsl(0 0% 28%)',
      display: 'hsl(0 0% 12%)',
      displayText: 'hsl(43 11% 84%)',
      buttonBg: 'hsl(0 0% 22%)',
      buttonHover: 'hsl(0 0% 28%)',
      buttonActive: 'hsl(0 0% 34%)',
      operatorBg: 'hsl(39 67% 50%)',
      operatorHover: 'hsl(39 67% 60%)',
      numberBg: 'hsl(0 0% 18%)',
      numberHover: 'hsl(0 0% 24%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: true,
      animations: true,
    },
  },
  'dyslexia-friendly': {
    id: 'dyslexia-friendly',
    name: 'Dyslexia Friendly',
    preset: 'dyslexia-friendly',
    colors: {
      background: 'hsl(45 100% 96%)',
      foreground: 'hsl(0 0% 0%)',
      primary: 'hsl(211 100% 43%)',
      secondary: 'hsl(45 100% 88%)',
      accent: 'hsl(142 71% 45%)',
      muted: 'hsl(45 100% 90%)',
      border: 'hsl(45 60% 70%)',
      display: 'hsl(45 100% 92%)',
      displayText: 'hsl(0 0% 0%)',
      buttonBg: 'hsl(45 100% 88%)',
      buttonHover: 'hsl(45 100% 82%)',
      buttonActive: 'hsl(45 100% 76%)',
      operatorBg: 'hsl(211 100% 43%)',
      operatorHover: 'hsl(211 100% 50%)',
      numberBg: 'hsl(45 100% 94%)',
      numberHover: 'hsl(45 100% 90%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: false,
      animations: false,
    },
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High Contrast',
    preset: 'high-contrast',
    colors: {
      background: 'hsl(0 0% 0%)',
      foreground: 'hsl(0 0% 100%)',
      primary: 'hsl(60 100% 50%)',
      secondary: 'hsl(0 0% 10%)',
      accent: 'hsl(120 100% 50%)',
      muted: 'hsl(0 0% 20%)',
      border: 'hsl(0 0% 100%)',
      display: 'hsl(0 0% 0%)',
      displayText: 'hsl(60 100% 50%)',
      buttonBg: 'hsl(0 0% 100%)',
      buttonHover: 'hsl(0 0% 90%)',
      buttonActive: 'hsl(0 0% 80%)',
      operatorBg: 'hsl(60 100% 40%)',
      operatorHover: 'hsl(60 100% 50%)',
      numberBg: 'hsl(0 0% 15%)',
      numberHover: 'hsl(0 0% 25%)',
    },
    effects: {
      blur: false,
      glow: false,
      shadows: false,
      animations: false,
    },
  },
}

interface ThemeState {
  mode: ThemeMode
  currentTheme: ThemePreset
  customThemes: Theme[]
  
  setMode: (mode: ThemeMode) => void
  setTheme: (preset: ThemePreset) => void
  addCustomTheme: (theme: Theme) => void
  removeCustomTheme: (id: string) => void
  getActiveTheme: () => Theme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      currentTheme: 'glassmorphism',
      customThemes: [],

      setMode: (mode) => set({ mode }),
      
      setTheme: (preset) => set({ currentTheme: preset }),
      
      addCustomTheme: (theme) =>
        set((state) => ({
          customThemes: [...state.customThemes, theme],
        })),
      
      removeCustomTheme: (id) =>
        set((state) => ({
          customThemes: state.customThemes.filter((t) => t.id !== id),
        })),
      
      getActiveTheme: () => {
        const state = get()
        return themes[state.currentTheme]
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
