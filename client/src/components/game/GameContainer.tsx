import { useState, useEffect, useCallback } from 'react';
import ClickButton from './ClickButton';
import UpgradeItem from './UpgradeItem';
import RebirthCard from './RebirthCard';
import LeaderboardCard from './LeaderboardCard';
import StatisticsSection from './StatisticsSection';
import { useGame } from '../../hooks/useGame';

interface GameContainerProps {
  onShowCredits: () => void;
  onShowPrivacy: () => void;
}

export default function GameContainer({ onShowCredits, onShowPrivacy }: GameContainerProps) {
  const { saveGame, loadGame, gameState } = useGame();
  const [playTime, setPlayTime] = useState('00:00:00');
  const [leaderboardSubmitted, setLeaderboardSubmitted] = useState(false);
  
  // Create a local updatePlayTime function
  const calculatePlayTime = useCallback(() => {
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
  
  // Update play time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayTime(calculatePlayTime());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculatePlayTime]);
  
  const handleSaveGame = (e: React.MouseEvent) => {
    e.preventDefault();
    saveGame();
    alert('Game saved successfully!');
  };
  
  const handleLoadGame = (e: React.MouseEvent) => {
    e.preventDefault();
    loadGame();
    alert('Game loaded successfully!');
  };
  
  const handleLeaderboardSubmit = (success: boolean) => {
    setLeaderboardSubmitted(success);
    
    if (success) {
      setTimeout(() => {
        setLeaderboardSubmitted(false);
      }, 3000);
    }
  };
  
  // If gameState is not defined yet, show a loading state
  if (!gameState) {
    return (
      <div className="main-content relative flex flex-col items-center justify-center w-full h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Loading Game...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="main-content relative flex flex-col items-center justify-center w-full">
      <div className="game-container relative w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-6">
        {/* Game Header */}
        <div className="game-header w-full text-center mb-2">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Enter Clicker!
          </h1>
          <p className="text-neutral-500 mt-1">Tap, upgrade, and rebirth your way to the top!</p>
        </div>

        {/* Main Game Card */}
        <div className="main-game-card w-full bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-6 transition-all duration-300 hover:shadow-card-hover">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Click Area */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Click Button */}
              <ClickButton />

              {/* Stats Display */}
              <div className="stats-display w-full text-center my-4">
                <div className="count-container mb-2">
                  <h2 className="font-heading text-xl text-neutral-500">You have</h2>
                  <div className="inline-flex items-baseline">
                    <span className="text-4xl font-bold text-indigo-600 mr-2">{gameState.count.toLocaleString()}</span>
                    <span className="text-xl text-neutral-500">points</span>
                  </div>
                </div>
                <div className="count-cps flex items-center justify-center text-sm text-neutral-500">
                  <span>Points per click:</span>
                  <span className="ml-2 font-bold text-purple-600">
                    {(gameState.pointsPerClick * gameState.pointMultiplier * (1 + gameState.rebirthBonus / 100)).toLocaleString()}
                  </span>
                </div>
                <div className="count-cps flex items-center justify-center text-sm text-neutral-500">
                  <span>Points per second:</span>
                  <span className="ml-2 font-bold text-purple-600">
                    {(gameState.pointsPerSecond * gameState.pointMultiplier * (1 + gameState.rebirthBonus / 100)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Upgrades */}
            <div className="flex-1">
              <div className="upgrades-section">
                <h2 className="font-heading text-xl font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <i className="ri-rocket-line text-indigo-500"></i>
                  Upgrades
                </h2>
                <div className="upgrade-list space-y-3 overflow-y-auto max-h-64 pr-2">
                  {Object.values(gameState.upgrades).map((upgrade) => (
                    <UpgradeItem 
                      key={upgrade.id}
                      id={upgrade.id}
                      name={upgrade.name}
                      description={upgrade.description}
                      level={upgrade.level}
                      price={upgrade.currentPrice}
                      canAfford={gameState.count >= upgrade.currentPrice}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rebirth & Leaderboard Section */}
        <div className="additional-features w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <RebirthCard />
          <LeaderboardCard 
            onSubmitSuccess={handleLeaderboardSubmit}
            submitted={leaderboardSubmitted}
          />
        </div>

        {/* Statistics Section */}
        <StatisticsSection playTime={playTime} />

        {/* Footer Section */}
        <div className="footer-section text-center text-neutral-500 text-sm mt-2 w-full">
          <p>Made with <span className="text-red-500">♥</span> by Damian B (meowinc) &copy; 2023</p>
          <div className="flex justify-center gap-2 mt-1">
            <a href="#" onClick={onShowCredits} className="text-indigo-500 hover:text-indigo-700 transition-colors">Credits</a>
            <span className="text-neutral-300">|</span>
            <a href="#" onClick={onShowPrivacy} className="text-indigo-500 hover:text-indigo-700 transition-colors">Privacy</a>
            <span className="text-neutral-300">|</span>
            <a href="#" onClick={handleSaveGame} className="text-indigo-500 hover:text-indigo-700 transition-colors">Save Game</a>
            <span className="text-neutral-300">|</span>
            <a href="#" onClick={handleLoadGame} className="text-indigo-500 hover:text-indigo-700 transition-colors">Load Game</a>
          </div>
        </div>
      </div>
    </div>
  );
}
