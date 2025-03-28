import { useState } from 'react';
import { useGame } from '../../hooks/useGame';

interface UpgradeItemProps {
  id: string;
  name: string;
  description: string;
  level: number;
  price: number;
  canAfford: boolean;
}

export default function UpgradeItem({ id, name, description, level, price, canAfford }: UpgradeItemProps) {
  const { purchaseUpgrade, formatNumber } = useGame();
  const [animating, setAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'success' | 'error'>('success');
  
  const handlePurchase = () => {
    if (canAfford) {
      purchaseUpgrade(id);
      setAnimationType('success');
    } else {
      setAnimationType('error');
    }
    
    // Apply animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };
  
  const bgClass = animating 
    ? animationType === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    : 'bg-white';
  
  const buttonOpacity = canAfford ? '' : 'opacity-60 cursor-not-allowed';
  
  return (
    <div className={`upgrade-item ${bgClass} rounded-lg game-radius p-3 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-indigo-700">{name}</h3>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
        <button 
          onClick={handlePurchase}
          className={`upgrade-button purchase-button bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-lg shadow-btn hover:shadow-btn-hover transition-all duration-200 text-sm font-medium ${buttonOpacity}`}
        >
          <span className="price">{formatNumber(price)}</span> points
        </button>
      </div>
      <div className="mt-2 text-xs text-neutral-500 flex items-center">
        <span>Level:</span>
        <span className="level ml-1 font-medium text-indigo-600">{level}</span>
      </div>
    </div>
  );
}
