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
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4">
          <div className="font-display text-3xl font-extrabold tracking-tight text-ideation-primary">
            {formatTime(state.sessionTime)}
          </div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55">
            Session time
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleToggleTimer}
            className="inline-flex items-center gap-2 rounded-full bg-ideation-primary px-4 py-2.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95"
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
              className="inline-flex items-center gap-1.5 rounded-full bg-ideation-warning px-3.5 py-2.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95"
              title="Skip to next round (testing)"
            >
              <SkipForward className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Skip</span>
            </button>
          )}
          <button
            onClick={resetSession}
            className="inline-flex items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/80 px-4 py-2.5 text-ideation-secondary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Progress Bar with Round Markers */}
      <div className="relative mb-2 h-3 w-full rounded-full bg-black/10 dark:bg-white/12">
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
      <div className="flex justify-between text-xs font-semibold text-foreground/45">
        <span>0:00</span>
        <span>1:00</span>
        <span>2:00</span>
        <span>3:00</span>
        <span>4:00</span>
      </div>
    </div>
  );
}
