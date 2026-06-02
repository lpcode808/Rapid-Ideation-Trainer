import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useSession } from '@/context/SessionContext';

export function TimerSection() {
  const { state, startTimer, pauseTimer, resetSession, skipToNextRound, formatTime } = useSession();

  const handleToggleTimer = () => {
    if (state.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const progress = ((240 - state.sessionTime) / 240) * 100;
  
  const getProgressBarColor = () => {
    switch(state.currentRound) {
      case 1: return 'from-round-1 to-round-1';
      case 2: return 'from-round-2 to-round-2';
      case 3: return 'from-round-3 to-round-3';
      case 4: return 'from-round-4 to-round-4';
      default: return 'from-ideation-primary to-ideation-accent';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-ideation-secondary">
            {formatTime(state.sessionTime)}
          </div>
          <div className="text-sm text-ideation-secondary/70">Session Time</div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleTimer}
            className="px-4 py-2 bg-ideation-primary text-white rounded-lg hover:bg-ideation-primary/90 transition-colors flex items-center space-x-2"
          >
            {state.isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{state.isRunning ? 'Pause' : (state.isPaused ? 'Resume' : 'Start')}</span>
          </button>
          {state.currentRound < 4 && (
            <button
              onClick={skipToNextRound}
              className="px-3 py-2 bg-ideation-warning text-white rounded-lg hover:bg-ideation-warning/90 transition-colors flex items-center space-x-1"
              title="Skip to next round (testing)"
            >
              <SkipForward className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Skip</span>
            </button>
          )}
          <button
            onClick={resetSession}
            className="px-4 py-2 bg-ideation-secondary text-white dark:bg-gray-600 dark:text-white rounded-lg hover:bg-ideation-secondary/90 dark:hover:bg-gray-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Progress Bar with Round Markers */}
      <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
        <div 
          className={`bg-gradient-to-r ${getProgressBarColor()} h-3 rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        />
        {/* Round markers at 25%, 50%, 75% */}
        {[25, 50, 75].map((position, index) => (
          <div
            key={position}
            className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-sm"
            style={{ left: `${position}%` }}
            title={`Round ${index + 2} starts here`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-ideation-secondary/60">
        <span>0:00</span>
        <span className="text-xs text-ideation-secondary/40">1:00</span>
        <span className="text-xs text-ideation-secondary/40">2:00</span>
        <span className="text-xs text-ideation-secondary/40">3:00</span>
        <span>4:00</span>
      </div>
    </div>
  );
}
