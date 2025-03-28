export type ThemeMode = 'light' | 'dark' | 'rainbow-light' | 'rainbow-dark' | 'custom-theme';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  level: number;
  currentPrice: number;
  effect: (level: number) => void;
}

export interface GameState {
  count: number;
  pointsPerClick: number;
  pointsPerSecond: number;
  pointMultiplier: number;
  totalClicks: number;
  totalPointsEarned: number;
  pointsSpent: number;
  rebirthLevel: number;
  rebirthBonus: number;
  startTime: Date;
  upgrades: Record<string, Upgrade>;
}

export interface CustomThemeSettings {
  bgColor: string;
  containerBg: string;
  textColor: string;
  secondaryText: string;
  borderColor: string;
  accentColor: string;
  shadowIntensity: number;
  borderRadius: number;
}

export interface ThemePresetOption {
  name: string;
  id: string;
  settings: CustomThemeSettings;
}
