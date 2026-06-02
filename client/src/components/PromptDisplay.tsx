import { Clock, Shuffle } from 'lucide-react';
import { useSession } from '@/context/SessionContext';

export function PromptDisplay() {
  const { state, shufflePrompt } = useSession();

  const getCurrentRoundBorderColor = () => {
    switch(state.currentRound) {
      case 1: return 'border-round-1';
      case 2: return 'border-round-2';
      case 3: return 'border-round-3';
      case 4: return 'border-round-4';
      default: return 'border-ideation-primary';
    }
  };

  const getCurrentRoundGradientColor = () => {
    switch(state.currentRound) {
      case 1: return 'from-red-50 to-red-25 dark:from-red-950 dark:to-red-900';
      case 2: return 'from-blue-50 to-blue-25 dark:from-blue-950 dark:to-blue-900';
      case 3: return 'from-pink-50 to-pink-25 dark:from-pink-950 dark:to-pink-900';
      case 4: return 'from-green-50 to-green-25 dark:from-green-950 dark:to-green-900';
      default: return 'from-ideation-primary/5 to-ideation-accent/5 dark:from-purple-950 dark:to-violet-900';
    }
  };

  // Don't show prompt if session is completed
  if (state.isCompleted) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r ${getCurrentRoundGradientColor()} rounded-lg p-6 mb-6 border-l-4 ${getCurrentRoundBorderColor()} relative`}>
      {/* Subtle shuffle button in top-right corner */}
      <button
        onClick={shufflePrompt}
        className="absolute top-4 right-4 p-1.5 text-ideation-secondary/50 dark:text-white/40 hover:text-ideation-secondary dark:hover:text-white hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-all duration-200"
        title="Get a new prompt"
      >
        <Shuffle className="w-4 h-4" />
      </button>
      
      <div className="text-sm font-medium text-ideation-primary dark:text-white/80 mb-2">Current Prompt</div>
      <h2 className="text-xl md:text-2xl font-semibold text-ideation-secondary dark:text-white leading-relaxed pr-10">
        {state.currentPrompt || 'Loading prompt...'}
      </h2>
      <div className="mt-3 text-sm text-ideation-secondary/70 dark:text-white/60">
        <Clock className="inline w-4 h-4 mr-1" />
        Generate as many ideas as possible in 1 minute
      </div>
    </div>
  );
}
