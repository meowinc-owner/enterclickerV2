interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl game-radius shadow-xl p-6 w-full max-w-lg mx-4 relative overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
        
        <h2 className="font-heading text-2xl font-bold text-neutral-800 mb-4 text-center">Privacy Policy</h2>
        
        <div className="privacy-content text-neutral-600 space-y-4 text-sm">
          <p>This Privacy Policy explains how we collect, use, and protect your information when you play Enter Clicker!</p>
          
          <h3 className="font-heading text-lg font-semibold text-neutral-700 mt-4">Information We Collect</h3>
          <p>We collect your name when you submit scores to our leaderboard. Game progress is stored locally on your device.</p>
          
          <h3 className="font-heading text-lg font-semibold text-neutral-700 mt-4">Use of Cookies</h3>
          <p>We use cookies to enhance your gaming experience and remember your preferences. You can choose to disable cookies in your browser settings.</p>
          
          <h3 className="font-heading text-lg font-semibold text-neutral-700 mt-4">How We Use Your Information</h3>
          <p>We use your information to display your name on our leaderboard. We do not sell or share your personal information with third parties.</p>
          
          <h3 className="font-heading text-lg font-semibold text-neutral-700 mt-4">Data Security</h3>
          <p>We take reasonable measures to protect your information from unauthorized access or disclosure.</p>
          
          <h3 className="font-heading text-lg font-semibold text-neutral-700 mt-4">Contact Us</h3>
          <p>If you have any questions or concerns about our Privacy Policy, please contact us at privacy@enterclicker.com.</p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">Last updated: December 2023</p>
        </div>
      </div>
    </div>
  );
}
