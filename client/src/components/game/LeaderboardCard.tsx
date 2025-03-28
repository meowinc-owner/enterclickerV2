import { useState } from 'react';
import { useGame } from '../../hooks/useGame';

interface LeaderboardCardProps {
  onSubmitSuccess: (success: boolean) => void;
  submitted: boolean;
}

export default function LeaderboardCard({ onSubmitSuccess, submitted }: LeaderboardCardProps) {
  const { submitScore, cookiesAccepted, gameState } = useGame();
  const [playerName, setPlayerName] = useState('');
  
  // Handle case where gameState might be undefined
  if (!gameState) {
    return (
      <div className="leaderboard-card bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-5 transition-all duration-300 hover:shadow-card-hover relative overflow-hidden">
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      alert('Please enter your name before submitting your score.');
      return;
    }
    
    if (!cookiesAccepted) {
      alert('You need to accept cookies to submit your score to the leaderboard.');
      return;
    }
    
    const success = await submitScore(playerName);
    onSubmitSuccess(success);
    
    if (success) {
      setPlayerName('');
    }
  };
  
  return (
    <div className="leaderboard-card bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-5 transition-all duration-300 hover:shadow-card-hover relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-br-full -z-10"></div>
      
      <h2 className="font-heading text-xl font-semibold text-neutral-700 mb-3 flex items-center gap-2">
        <i className="ri-trophy-line text-indigo-600"></i>
        Leaderboard
      </h2>
      
      <div className="leaderboard-description text-sm text-neutral-600 mb-4">
        Submit your score to compete with players around the world!
      </div>
      
      <div className="submit-score mb-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input 
              type="text" 
              id="playerName" 
              placeholder="Enter your name" 
              className="w-full px-4 py-2.5 rounded-lg game-radius border border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <i className="ri-user-line absolute left-3 top-3.5 text-indigo-400"></i>
          </div>
          <button 
            type="submit" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg game-radius shadow-btn hover:shadow-btn-hover transition-all duration-200 font-medium flex items-center justify-center gap-2"
          >
            <i className="ri-send-plane-line"></i>
            <span>Submit Score</span>
          </button>
        </form>
      </div>
      
      {submitted && (
        <div className="text-sm text-center text-green-600 mb-2">
          Score submitted successfully!
        </div>
      )}
    </div>
  );
}
