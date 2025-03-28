import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { GameState, ThemeMode, Upgrade, CustomThemeSettings } from '../types/game';
import { formatNumber } from '../utils/gameUtils';
import { applyThemeStyles } from '../utils/themeUtils';

// Storage keys
const STORAGE_KEYS = {
  COOKIES_ACCEPTED: 'enterClicker_cookiesAccepted',
  GAME_DATA: 'enterClicker_gameData',
  THEME: 'enterClicker_theme',
  CUSTOM_THEME: 'enterClicker_customTheme',
  AUTO_SAVE_INTERVAL: 'enterClicker_autoSaveInterval'
};

interface GameContextProps {
  gameState: GameState;
  incrementCount: () => void;
  purchaseUpgrade: (upgradeId: string) => void;
  rebirth: () => void;
  submitScore: (playerName: string) => Promise<boolean>;
  saveGame: () => void;
  loadGame: () => void;
  formatNumber: (num: number) => string;
  themeMode: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cookiesAccepted: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
  resetGame: () => void;
  applyCustomTheme: (settings: CustomThemeSettings) => void;
  customThemeSettings: CustomThemeSettings;
  saveThemePreference: (theme: ThemeMode) => void;
  // Keep this for backwards compatibility
  updatePlayTime: () => string;
}

const defaultCustomTheme: CustomThemeSettings = {
  bgColor: '#f9faff',
  containerBg: '#ffffff',
  textColor: '#333333',
  secondaryText: '#666666',
  borderColor: '#e0e0e0',
  accentColor: '#9333ea',
  shadowIntensity: 5,
  borderRadius: 10
};

const defaultGameState: GameState = {
  count: 0,
  pointsPerClick: 1,
  pointsPerSecond: 0,
  pointMultiplier: 1,
  totalClicks: 0,
  totalPointsEarned: 0,
  pointsSpent: 0,
  rebirthLevel: 0,
  rebirthBonus: 0,
  startTime: new Date(),
  upgrades: {
    upgrade1: {
      id: 'upgrade1',
      name: 'Click Power',
      description: '+1 point per click',
      basePrice: 10,
      level: 0,
      currentPrice: 10,
      effect: (level) => {}
    },
    upgrade2: {
      id: 'upgrade2',
      name: 'Auto Clicker',
      description: '+1 point per second',
      basePrice: 15,
      level: 0,
      currentPrice: 15,
      effect: (level) => {}
    },
    upgrade3: {
      id: 'upgrade3',
      name: 'Point Multiplier',
      description: 'x1.5 to all points',
      basePrice: 100,
      level: 0,
      currentPrice: 100,
      effect: (level) => {}
    },
    upgrade4: {
      id: 'upgrade4',
      name: 'Mega Clicker',
      description: '+10 points per second',
      basePrice: 200,
      level: 0,
      currentPrice: 200,
      effect: (level) => {}
    },
    upgrade5: {
      id: 'upgrade5',
      name: 'Super Click',
      description: '+50 points per click',
      basePrice: 1000,
      level: 0,
      currentPrice: 1000,
      effect: (level) => {}
    },
    upgrade6: {
      id: 'upgrade6',
      name: 'Ultra Auto Clicker',
      description: '+100 points per second',
      basePrice: 2000,
      level: 0,
      currentPrice: 2000,
      effect: (level) => {}
    }
  }
};

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [customThemeSettings, setCustomThemeSettings] = useState<CustomThemeSettings>(defaultCustomTheme);
  const [lastSaveTime, setLastSaveTime] = useState<Date>(new Date());
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize game and check for cookies on first render
  useEffect(() => {
    const cookieState = localStorage.getItem(STORAGE_KEYS.COOKIES_ACCEPTED);
    
    if (cookieState === 'true') {
      setCookiesAccepted(true);
      loadGameFromStorage();
    } else {
      setGameState(defaultGameState);
    }
    
    setIsInitialized(true);
  }, []);

  // Load game from localStorage
  const loadGameFromStorage = useCallback(() => {
    try {
      // Load game data
      const savedData = localStorage.getItem(STORAGE_KEYS.GAME_DATA);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert the ISO string back to a Date object
        const startTime = new Date(parsedData.startTime || new Date());
        setGameState({
          ...parsedData,
          startTime
        });
      } else {
        setGameState(defaultGameState);
      }
      
      // Load theme preferences
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme) {
        setThemeMode(savedTheme as ThemeMode);
      }
      
      // Load custom theme settings
      const savedCustomTheme = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEME);
      if (savedCustomTheme) {
        setCustomThemeSettings(JSON.parse(savedCustomTheme));
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
      setGameState(defaultGameState);
    }
  }, []);

  // Set up game loop for auto-clickers and auto-save
  useEffect(() => {
    if (!gameState) return;
    
    const gameInterval = setInterval(() => {
      if (gameState.pointsPerSecond > 0) {
        setGameState(prevState => {
          if (!prevState) return prevState;
          
          const pointsEarned = prevState.pointsPerSecond * prevState.pointMultiplier * (1 + prevState.rebirthBonus / 100);
          return {
            ...prevState,
            count: prevState.count + pointsEarned,
            totalPointsEarned: prevState.totalPointsEarned + pointsEarned
          };
        });
      }

      // Auto-save every minute
      const now = new Date();
      if (cookiesAccepted && now.getTime() - lastSaveTime.getTime() > 60000) {
        saveGameToStorage();
        setLastSaveTime(now);
      }
    }, 1000);

    return () => clearInterval(gameInterval);
  }, [gameState, cookiesAccepted, lastSaveTime]);

  // Apply theme styles when theme changes
  useEffect(() => {
    if (themeMode === 'custom-theme') {
      applyThemeStyles(customThemeSettings);
    } else {
      document.body.className = themeMode;
      
      // Update body background for non-rainbow themes
      if (themeMode === 'light') {
        document.body.classList.add('bg-gradient-to-br', 'from-indigo-50', 'to-purple-50');
      } else if (themeMode === 'dark') {
        document.body.classList.add('bg-gradient-to-br', 'from-neutral-900', 'to-neutral-800');
      }
    }
    
    // Save theme preference if cookies are accepted
    if (cookiesAccepted) {
      localStorage.setItem(STORAGE_KEYS.THEME, themeMode);
    }
  }, [themeMode, customThemeSettings, cookiesAccepted]);

  // Save current game state to localStorage
  const saveGameToStorage = useCallback(() => {
    if (!cookiesAccepted || !gameState) return;
    
    try {
      const gameData = {
        ...gameState,
        startTime: gameState.startTime.toISOString()
      };
      
      localStorage.setItem(STORAGE_KEYS.GAME_DATA, JSON.stringify(gameData));
      setLastSaveTime(new Date());
    } catch (error) {
      console.error("Error saving game data:", error);
    }
  }, [gameState, cookiesAccepted]);

  const incrementCount = useCallback(() => {
    setGameState(prevState => {
      if (!prevState) return prevState;
      
      const pointsEarned = prevState.pointsPerClick * prevState.pointMultiplier * (1 + prevState.rebirthBonus / 100);
      return {
        ...prevState,
        count: prevState.count + pointsEarned,
        totalPointsEarned: prevState.totalPointsEarned + pointsEarned,
        totalClicks: prevState.totalClicks + 1
      };
    });
  }, []);

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    setGameState(prevState => {
      if (!prevState) return prevState;
      
      const upgrade = prevState.upgrades[upgradeId];
      
      if (!upgrade || prevState.count < upgrade.currentPrice) {
        return prevState;
      }
      
      // Calculate new state based on the upgrade
      let newPointsPerClick = prevState.pointsPerClick;
      let newPointsPerSecond = prevState.pointsPerSecond;
      let newPointMultiplier = prevState.pointMultiplier;
      
      switch (upgradeId) {
        case 'upgrade1': // Click Power
          newPointsPerClick += 1;
          break;
        case 'upgrade2': // Auto Clicker
          newPointsPerSecond += 1;
          break;
        case 'upgrade3': // Point Multiplier
          newPointMultiplier *= 1.5;
          break;
        case 'upgrade4': // Mega Clicker
          newPointsPerSecond += 10;
          break;
        case 'upgrade5': // Super Click
          newPointsPerClick += 50;
          break;
        case 'upgrade6': // Ultra Auto Clicker
          newPointsPerSecond += 100;
          break;
      }
      
      const newLevel = upgrade.level + 1;
      const newPrice = Math.round(upgrade.currentPrice * 1.15);
      
      const updatedState = {
        ...prevState,
        count: prevState.count - upgrade.currentPrice,
        pointsPerClick: newPointsPerClick,
        pointsPerSecond: newPointsPerSecond,
        pointMultiplier: newPointMultiplier,
        pointsSpent: prevState.pointsSpent + upgrade.currentPrice,
        upgrades: {
          ...prevState.upgrades,
          [upgradeId]: {
            ...upgrade,
            level: newLevel,
            currentPrice: newPrice
          }
        }
      };
      
      // Auto-save after purchasing an upgrade if cookies are accepted
      if (cookiesAccepted) {
        setTimeout(() => saveGameToStorage(), 100);
      }
      
      return updatedState;
    });
  }, [cookiesAccepted, saveGameToStorage]);

  const rebirth = useCallback(() => {
    setGameState(prevState => {
      if (!prevState) return prevState;
      
      const rebirthCost = 1000 * Math.pow(10, prevState.rebirthLevel);
      
      if (prevState.count < rebirthCost) {
        return prevState;
      }
      
      const newRebirthLevel = prevState.rebirthLevel + 1;
      const newRebirthBonus = newRebirthLevel * 10;
      
      // Reset upgrades to their initial state
      const resetUpgrades: Record<string, Upgrade> = {};
      
      Object.keys(prevState.upgrades).forEach(id => {
        const upgrade = prevState.upgrades[id];
        resetUpgrades[id] = {
          ...upgrade,
          level: 0,
          currentPrice: upgrade.basePrice
        };
      });
      
      const updatedState = {
        ...prevState,
        count: 0,
        pointsPerClick: 1,
        pointsPerSecond: 0,
        pointMultiplier: 1,
        rebirthLevel: newRebirthLevel,
        rebirthBonus: newRebirthBonus,
        upgrades: resetUpgrades
      };
      
      // Auto-save after rebirth if cookies are accepted
      if (cookiesAccepted) {
        setTimeout(() => saveGameToStorage(), 100);
      }
      
      return updatedState;
    });
  }, [cookiesAccepted, saveGameToStorage]);

  const submitScore = useCallback(async (playerName: string): Promise<boolean> => {
    if (!playerName.trim() || !cookiesAccepted || !gameState) {
      return false;
    }
    
    try {
      const { collection, addDoc, serverTimestamp } = (window as any).firebaseFirestore;
      const db = (window as any).firebaseDb;
      
      await addDoc(collection(db, "leaderboard"), {
        name: playerName,
        score: Math.floor(gameState.count),
        rebirthLevel: gameState.rebirthLevel,
        totalPointsEarned: Math.floor(gameState.totalPointsEarned),
        timestamp: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error("Error submitting score:", error);
      return false;
    }
  }, [gameState, cookiesAccepted]);

  const saveGame = useCallback(() => {
    saveGameToStorage();
    return true;
  }, [saveGameToStorage]);

  const loadGame = useCallback(() => {
    loadGameFromStorage();
    return true;
  }, [loadGameFromStorage]);

  const acceptCookies = useCallback(() => {
    setCookiesAccepted(true);
    localStorage.setItem(STORAGE_KEYS.COOKIES_ACCEPTED, 'true');
    
    // Save current game state after accepting cookies
    setTimeout(() => saveGameToStorage(), 100);
  }, [saveGameToStorage]);

  const declineCookies = useCallback(() => {
    setCookiesAccepted(false);
    localStorage.setItem(STORAGE_KEYS.COOKIES_ACCEPTED, 'false');
    
    // Clear any existing saved data
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.COOKIES_ACCEPTED) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(defaultGameState);
    
    if (cookiesAccepted) {
      setTimeout(() => saveGameToStorage(), 100);
    }
  }, [cookiesAccepted, saveGameToStorage]);

  const setTheme = useCallback((theme: ThemeMode) => {
    setThemeMode(theme);
    
    if (cookiesAccepted) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
  }, [cookiesAccepted]);

  const saveThemePreference = useCallback((theme: ThemeMode) => {
    if (cookiesAccepted) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
  }, [cookiesAccepted]);

  const applyCustomTheme = useCallback((settings: CustomThemeSettings) => {
    setCustomThemeSettings(settings);
    setThemeMode('custom-theme');
    
    if (cookiesAccepted) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_THEME, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.THEME, 'custom-theme');
    }
  }, [cookiesAccepted]);

  // If we're still initializing, return a provider with default values
  if (!isInitialized || !gameState) {
    // Create a placeholder context with non-functional methods
    const placeholderContext: GameContextProps = {
      gameState: defaultGameState,
      incrementCount: () => {},
      purchaseUpgrade: () => {},
      rebirth: () => {},
      submitScore: async () => false,
      saveGame: () => {},
      loadGame: () => {},
      formatNumber: (n) => n.toString(),
      updatePlayTime: () => '00:00:00',
      themeMode: 'light',
      setTheme: () => {},
      cookiesAccepted: false,
      acceptCookies: () => {},
      declineCookies: () => {},
      resetGame: () => {},
      applyCustomTheme: () => {},
      customThemeSettings: defaultCustomTheme,
      saveThemePreference: () => {}
    };
    
    return (
      <GameContext.Provider value={placeholderContext}>
        {children}
      </GameContext.Provider>
    );
  }

  // For backward compatibility - calculates and returns the play time
  const updatePlayTime = useCallback(() => {
    if (!gameState) return '00:00:00';
    
    const now = new Date();
    const elapsedTime = new Date(now.getTime() - gameState.startTime.getTime());
    
    // Adjust for UTC
    const hours = elapsedTime.getUTCHours();
    const minutes = elapsedTime.getUTCMinutes();
    const seconds = elapsedTime.getUTCSeconds();
    
    // Format as HH:MM:SS
    return String(hours).padStart(2, '0') + ':' +
           String(minutes).padStart(2, '0') + ':' +
           String(seconds).padStart(2, '0');
  }, [gameState]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        incrementCount,
        purchaseUpgrade,
        rebirth,
        submitScore,
        saveGame,
        loadGame,
        formatNumber,
        themeMode,
        setTheme,
        cookiesAccepted,
        acceptCookies,
        declineCookies,
        resetGame,
        applyCustomTheme,
        customThemeSettings,
        saveThemePreference,
        updatePlayTime
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
