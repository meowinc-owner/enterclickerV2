import { CustomThemeSettings, ThemePresetOption } from '../types/game';

// Apply custom theme styles to document
export function applyThemeStyles(settings: CustomThemeSettings): void {
  document.documentElement.style.setProperty('--bg-color', settings.bgColor);
  document.documentElement.style.setProperty('--container-bg', settings.containerBg);
  document.documentElement.style.setProperty('--text-color', settings.textColor);
  document.documentElement.style.setProperty('--secondary-text', settings.secondaryText);
  document.documentElement.style.setProperty('--tertiary-text', settings.secondaryText);
  document.documentElement.style.setProperty('--border-color', settings.borderColor);
  document.documentElement.style.setProperty('--stats-border', settings.borderColor);
  document.documentElement.style.setProperty('--rebirth-color', settings.accentColor);
  document.documentElement.style.setProperty('--shadow-color', `rgba(0, 0, 0, ${settings.shadowIntensity / 10})`);
  
  // Apply border radius
  document.querySelectorAll('.game-radius').forEach(el => {
    (el as HTMLElement).style.borderRadius = `${settings.borderRadius}px`;
  });
}

// Reset custom theme to defaults
export function resetCustomThemeSettings(): CustomThemeSettings {
  return {
    bgColor: '#f9faff',
    containerBg: '#ffffff',
    textColor: '#333333',
    secondaryText: '#666666',
    borderColor: '#e0e0e0',
    accentColor: '#9333ea',
    shadowIntensity: 5,
    borderRadius: 10
  };
}

// Theme presets
export const themePresets: Record<string, ThemePresetOption> = {
  cool: {
    id: 'cool',
    name: 'Cool Blue',
    settings: {
      bgColor: '#EFF6FF',
      containerBg: '#FFFFFF',
      textColor: '#1E3A8A',
      secondaryText: '#3B82F6',
      borderColor: '#BFDBFE',
      accentColor: '#2563EB',
      shadowIntensity: 4,
      borderRadius: 12
    }
  },
  mint: {
    id: 'mint',
    name: 'Mint Green',
    settings: {
      bgColor: '#ECFDF5',
      containerBg: '#FFFFFF',
      textColor: '#065F46',
      secondaryText: '#10B981',
      borderColor: '#A7F3D0',
      accentColor: '#059669',
      shadowIntensity: 3,
      borderRadius: 8
    }
  },
  rose: {
    id: 'rose',
    name: 'Rose Gold',
    settings: {
      bgColor: '#FFF1F2',
      containerBg: '#FFFFFF',
      textColor: '#9F1239',
      secondaryText: '#FB7185',
      borderColor: '#FECDD3',
      accentColor: '#E11D48',
      shadowIntensity: 5,
      borderRadius: 16
    }
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    settings: {
      bgColor: '#FFFBEB',
      containerBg: '#FFFFFF',
      textColor: '#92400E',
      secondaryText: '#F59E0B',
      borderColor: '#FDE68A',
      accentColor: '#D97706',
      shadowIntensity: 6,
      borderRadius: 10
    }
  }
};
