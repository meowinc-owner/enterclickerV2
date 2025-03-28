import { useGame } from '../../hooks/useGame';

interface StatisticsSectionProps {
  playTime: string;
}

export default function StatisticsSection({ playTime }: StatisticsSectionProps) {
  const { gameState, formatNumber } = useGame();
  
  // Handle case where gameState might be undefined
  if (!gameState) {
    return (
      <div className="statistics-section w-full bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-5 transition-all duration-300 hover:shadow-card-hover mt-2">
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="statistics-section w-full bg-white/90 backdrop-blur-md rounded-2xl game-radius shadow-card p-5 transition-all duration-300 hover:shadow-card-hover mt-2">
      <h2 className="font-heading text-xl font-semibold text-neutral-700 mb-3 flex items-center gap-2">
        <i className="ri-bar-chart-box-line text-indigo-600"></i>
        Game Statistics
      </h2>
      
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl game-radius">
          <div className="text-xs text-neutral-500">Total Clicks</div>
          <div className="text-lg font-semibold text-indigo-700">{formatNumber(gameState.totalClicks)}</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl game-radius">
          <div className="text-xs text-neutral-500">Total Points Earned</div>
          <div className="text-lg font-semibold text-indigo-700">{formatNumber(gameState.totalPointsEarned)}</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl game-radius">
          <div className="text-xs text-neutral-500">Points Spent</div>
          <div className="text-lg font-semibold text-indigo-700">{formatNumber(gameState.pointsSpent)}</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl game-radius">
          <div className="text-xs text-neutral-500">Play Time</div>
          <div className="text-lg font-semibold text-indigo-700">{playTime}</div>
        </div>
      </div>
    </div>
  );
}
