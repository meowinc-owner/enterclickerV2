import { useState, useEffect } from "react";
import GameContainer from "./components/game/GameContainer";
import ThemeMenu from "./components/modals/ThemeMenu";
import CustomThemePanel from "./components/modals/CustomThemePanel";
import CreditsModal from "./components/modals/CreditsModal";
import PrivacyModal from "./components/modals/PrivacyModal";
import CookieBanner from "./components/modals/CookieBanner";
import { useGame } from "./hooks/useGame";
import { ThemeMode } from "./types/game";

function App() {
  const { cookiesAccepted, setTheme, saveThemePreference } = useGame();
  
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCustomTheme, setShowCustomTheme] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem('enterClickerTheme');
    if (savedTheme && cookiesAccepted) {
      setTheme(savedTheme as ThemeMode);
    }
  }, [cookiesAccepted, setTheme]);

  const toggleThemeMenu = () => {
    setShowThemeMenu(!showThemeMenu);
    if (showCustomTheme) setShowCustomTheme(false);
  };

  const handleThemeSelect = (theme: ThemeMode) => {
    setTheme(theme);
    setShowThemeMenu(false);
    if (cookiesAccepted) {
      saveThemePreference(theme);
    }
  };

  const openCustomTheme = () => {
    setShowThemeMenu(false);
    setShowCustomTheme(true);
  };

  return (
    <div className="font-sans min-h-screen transition-all ease-in-out duration-300">
      {/* Theme Toggle Button */}
      <div className="theme-menu absolute top-4 right-4 z-50">
        <button 
          onClick={toggleThemeMenu}
          className="theme-button flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-sm text-neutral-700 px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <i className="ri-paint-brush-line"></i>
          <span>Theme</span>
        </button>
      </div>

      {/* Main Game Container */}
      <GameContainer 
        onShowCredits={() => setShowCredits(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
      />

      {/* Modals */}
      <ThemeMenu 
        isOpen={showThemeMenu}
        onClose={() => setShowThemeMenu(false)}
        onThemeSelect={handleThemeSelect}
        onCustomize={openCustomTheme}
      />

      <CustomThemePanel 
        isOpen={showCustomTheme}
        onClose={() => setShowCustomTheme(false)}
      />

      <CreditsModal 
        isOpen={showCredits}
        onClose={() => setShowCredits(false)}
      />

      <PrivacyModal 
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;
