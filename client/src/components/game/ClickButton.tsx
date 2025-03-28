import { useGame } from '../../hooks/useGame';
import { createClickRipple } from '../../utils/gameUtils';

export default function ClickButton() {
  const { incrementCount } = useGame();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    incrementCount();
    createClickRipple(e);
  };
  
  return (
    <div className="click-area relative mb-4">
      <button 
        onClick={handleClick}
        className="w-44 h-44 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 pulse-animation"
      >
        <div className="text-center">
          <span className="text-5xl font-bold tracking-tighter">ENTER</span>
          <div className="text-sm mt-1 text-indigo-100">Click me!</div>
        </div>
      </button>
    </div>
  );
}
