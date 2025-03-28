import { useState, useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import { themePresets, resetCustomThemeSettings } from '../../utils/themeUtils';
import { CustomThemeSettings } from '../../types/game';

interface CustomThemePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomThemePanel({ isOpen, onClose }: CustomThemePanelProps) {
  const { applyCustomTheme, customThemeSettings: initialSettings } = useGame();
  const [settings, setSettings] = useState<CustomThemeSettings>(initialSettings);
  
  // Reset settings state when the panel opens
  useEffect(() => {
    if (isOpen) {
      setSettings(initialSettings);
    }
  }, [isOpen, initialSettings]);
  
  if (!isOpen) return null;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    
    if (type === 'range') {
      setSettings({
        ...settings,
        [id]: parseInt(value)
      });
    } else {
      setSettings({
        ...settings,
        [id]: value
      });
    }
  };
  
  const handleReset = () => {
    setSettings(resetCustomThemeSettings());
  };
  
  const handleApply = () => {
    applyCustomTheme(settings);
    onClose();
  };
  
  const applyPreset = (presetId: string) => {
    if (themePresets[presetId]) {
      setSettings(themePresets[presetId].settings);
    }
  };
  
  return (
    <div className="custom-theme-panel fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div className="custom-theme-content bg-white/95 backdrop-blur-md rounded-2xl game-radius shadow-xl p-6 w-full max-w-2xl mx-4 relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
        
        <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-2 text-center">Customize Theme</h2>
        <p className="text-neutral-500 text-sm text-center mb-6">Adjust colors and appearance to create your perfect theme</p>
        
        <div className="custom-theme-controls grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="custom-theme-control">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Background Color</label>
            <input 
              type="color" 
              id="bgColor" 
              className="w-full h-10 rounded-lg cursor-pointer" 
              value={settings.bgColor}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Container Background</label>
            <input 
              type="color" 
              id="containerBg" 
              className="w-full h-10 rounded-lg cursor-pointer" 
              value={settings.containerBg}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Text Color</label>
            <input 
              type="color" 
              id="textColor" 
              className="w-full h-10 rounded-lg cursor-pointer" 
              value={settings.textColor}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Secondary Text</label>
            <input 
              type="color" 
              id="secondaryText" 
              className="w-full h-10 rounded-lg cursor-pointer" 
              value={settings.secondaryText}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Border Color</label>
            <input 
              type="color" 
              id="borderColor" 
              className="w-full h-10 rounded-lg cursor-pointer" 
              value={settings.borderColor}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Accent Color</label>
            <input 
              type="color" 
              id="accentColor" 
              className="w-full h-10 rounded-lg cursor-pointer" 
              value={settings.accentColor}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control col-span-1 md:col-span-2">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Shadow Intensity</label>
            <input 
              type="range" 
              id="shadowIntensity" 
              min="0" 
              max="10" 
              value={settings.shadowIntensity} 
              className="w-full"
              onChange={handleInputChange}
            />
          </div>
          
          <div className="custom-theme-control col-span-1 md:col-span-2">
            <label className="text-neutral-700 mb-1 block text-sm font-medium">Border Radius</label>
            <input 
              type="range" 
              id="borderRadius" 
              min="0" 
              max="20" 
              value={settings.borderRadius} 
              className="w-full"
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="custom-theme-presets mt-6 border-t border-neutral-200 pt-4">
          <h3 className="font-heading text-lg font-semibold text-neutral-700 mb-3">Preset Themes</h3>
          <div className="presets-grid grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.values(themePresets).map(preset => (
              <button 
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`preset 
                  ${preset.id === 'cool' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : ''}
                  ${preset.id === 'mint' ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800' : ''}
                  ${preset.id === 'rose' ? 'bg-rose-100 hover:bg-rose-200 text-rose-800' : ''}
                  ${preset.id === 'sunset' ? 'bg-amber-100 hover:bg-amber-200 text-amber-800' : ''}
                  font-medium rounded-lg p-3 transition-all duration-200`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="custom-theme-actions flex justify-between mt-6 border-t border-neutral-200 pt-4">
          <button 
            onClick={handleReset}
            className="py-2.5 px-4 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg text-neutral-700 font-medium transition-all duration-200"
          >
            Reset
          </button>
          <button 
            onClick={handleApply}
            className="py-2.5 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-btn hover:shadow-btn-hover transition-all duration-200"
          >
            Apply Theme
          </button>
        </div>
      </div>
    </div>
  );
}
