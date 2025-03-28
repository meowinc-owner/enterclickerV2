interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl game-radius shadow-xl p-6 w-full max-w-lg mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
        
        <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-4 text-center">Credits</h2>
        
        <div className="credits-content text-neutral-600 space-y-4">
          <p><strong>Game Design & Development:</strong> Damian B (meowinc)</p>
          <p><strong>Inspiration:</strong> Classic clicker games like Cookie Clicker</p>
          <p><strong>Technologies Used:</strong> HTML5, CSS3, JavaScript, Firebase</p>
          <p><strong>Special Thanks:</strong> To all players who enjoy this game!</p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">Enter Clicker! &copy; 2023 - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
