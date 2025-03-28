import { useState } from 'react';
import { useGame } from '../../hooks/useGame';
import { calculateRebirthCost } from '../../utils/gameUtils';

export default function RebirthCard() {
  const { gameState, rebirth, formatNumber } = useGame();
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Handle case where gameState might be undefined
  if (!gameState) {
    return (
      <div className="rebirth-card bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-5 transition-all duration-300 hover:shadow-card-hover relative overflow-hidden">
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const rebirthCost = calculateRebirthCost(gameState.rebirthLevel);
  const canRebirth = gameState.count >= rebirthCost;
  
  const handleRebirthClick = () => {
    if (canRebirth) {
      setShowConfirm(true);
    } else {
      // Visual feedback for not being able to rebirth
      const button = document.getElementById('rebirthButton');
      button?.classList.add('bg-red-600');
      setTimeout(() => {
        button?.classList.remove('bg-red-600');
      }, 300);
    }
  };
  
  const confirmRebirth = () => {
    rebirth();
    setShowConfirm(false);
  };
  
  const cancelRebirth = () => {
    setShowConfirm(false);
  };
  
  return (
    <div className="rebirth-card bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-5 transition-all duration-300 hover:shadow-card-hover relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-bl-full -z-10"></div>
      
      <h2 className="font-heading text-xl font-semibold text-neutral-700 mb-3 flex items-center gap-2">
        <i className="ri-refresh-line text-purple-600"></i>
        Rebirth System
      </h2>
      
      <div className="rebirth-description text-sm text-neutral-600 mb-4">
        Reset your progress and start over with permanent bonuses. Each rebirth gives you a 
        <span className="text-purple-600 font-medium"> +10%</span> points boost for the next run.
      </div>
      
      <div className="rebirth-stats flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-500">Current Rebirth Level:</span>
          <span className="text-md font-medium text-purple-600">{gameState.rebirthLevel}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-500">Current Rebirth Bonus:</span>
          <span className="text-md font-medium text-purple-600">{gameState.rebirthBonus}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-500">Points Required:</span>
          <span className="text-md font-medium text-purple-600">{formatNumber(rebirthCost)}</span>
        </div>
      </div>
      
      {showConfirm ? (
        <div className="rebirth-confirm flex flex-col gap-3">
          <p className="text-sm text-amber-600 font-medium text-center">Are you sure? You will lose all progress but gain a permanent +10% points bonus.</p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={cancelRebirth}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={confirmRebirth}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="rebirth-actions flex justify-center">
          <button 
            id="rebirthButton"
            onClick={handleRebirthClick}
            className={`rebirth-button bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-btn hover:shadow-btn-hover transition-all duration-200 font-medium flex items-center gap-2 ${canRebirth ? 'pulse-animation' : 'opacity-60'}`}
          >
            <i className="ri-refresh-line"></i>
            <span>Rebirth Now</span>
          </button>
        </div>
      )}
    </div>
  );
}
