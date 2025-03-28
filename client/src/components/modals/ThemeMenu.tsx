import { useGame } from '../../hooks/useGame';
import { ThemeMode } from '../../types/game';

interface ThemeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeSelect: (theme: ThemeMode) => void;
  onCustomize: () => void;
}

export default function ThemeMenu({ isOpen, onClose, onThemeSelect, onCustomize }: ThemeMenuProps) {
  const { themeMode } = useGame();
  
  if (!isOpen) return null;
  
  return (
    <div className="theme-menu-panel fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div className="theme-menu-content bg-white/95 backdrop-blur-md rounded-2xl game-radius shadow-xl p-6 w-full max-w-lg mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
        
        <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-6 text-center">Choose Theme</h2>
        
        <div className="theme-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button 
            className={`theme-option bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl game-radius ${themeMode === 'light' ? 'border-2 border-indigo-300' : 'border-2 border-transparent hover:border-indigo-200'} flex flex-col items-center gap-2 transition-all duration-300`}
            onClick={() => onThemeSelect('light')}
          >
            <div className="theme-icon bg-white rounded-full p-2 shadow-md">
              <i className="ri-sun-line text-xl text-yellow-500"></i>
            </div>
            <div className="theme-name text-neutral-700 font-medium text-sm">Light</div>
          </button>
          
          <button 
            className={`theme-option bg-gradient-to-br from-neutral-800 to-neutral-900 p-4 rounded-xl game-radius ${themeMode === 'dark' ? 'border-2 border-purple-600' : 'border-2 border-transparent hover:border-neutral-700'} flex flex-col items-center gap-2 transition-all duration-300`}
            onClick={() => onThemeSelect('dark')}
          >
            <div className="theme-icon bg-neutral-700 rounded-full p-2 shadow-md">
              <i className="ri-moon-line text-xl text-indigo-300"></i>
            </div>
            <div className="theme-name text-neutral-200 font-medium text-sm">Dark</div>
          </button>
          
          <button 
            className={`theme-option bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4 rounded-xl game-radius ${themeMode === 'rainbow-light' ? 'border-2 border-pink-400' : 'border-2 border-transparent hover:border-purple-200'} flex flex-col items-center gap-2 transition-all duration-300`}
            onClick={() => onThemeSelect('rainbow-light')}
          >
            <div className="theme-icon bg-white rounded-full p-2 shadow-md">
              <i className="ri-rainbow-line text-xl text-pink-500"></i>
            </div>
            <div className="theme-name text-neutral-700 font-medium text-sm">Rainbow Light</div>
          </button>
          
          <button 
            className={`theme-option bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 rounded-xl game-radius ${themeMode === 'rainbow-dark' ? 'border-2 border-indigo-400' : 'border-2 border-transparent hover:border-indigo-700'} flex flex-col items-center gap-2 transition-all duration-300`}
            onClick={() => onThemeSelect('rainbow-dark')}
          >
            <div className="theme-icon bg-neutral-800 rounded-full p-2 shadow-md">
              <i className="ri-rainbow-line text-xl text-purple-400"></i>
            </div>
            <div className="theme-name text-neutral-200 font-medium text-sm">Rainbow Dark</div>
          </button>
        </div>
        
        <div className="custom-theme-section border-t border-neutral-200 pt-5">
          <button 
            onClick={onCustomize}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg game-radius font-medium shadow-btn hover:shadow-btn-hover transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="ri-palette-line"></i>
            <span>Customize Your Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
}
