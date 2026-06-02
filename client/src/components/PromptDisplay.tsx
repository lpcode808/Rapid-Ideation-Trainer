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

  // Don't show prompt if session is completed
  if (state.isCompleted) {
    return null;
  }

  return (
    <div className={`relative mb-6 overflow-hidden rounded-[1.5rem] border-l-4 ${getCurrentRoundBorderColor()} bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,247,235,0.82))] p-6 shadow-sm dark:bg-[linear-gradient(135deg,rgba(4,11,22,0.96),rgba(0,19,41,0.88))]`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(7,168,168,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(175,205,83,0.10),transparent_24%)]" />

      <button
        onClick={shufflePrompt}
        className="absolute right-4 top-4 rounded-md p-2 text-foreground/45 transition-all hover:bg-white/70 hover:text-ideation-primary dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
        title="Get a new prompt"
      >
        <Shuffle className="w-4 h-4" />
      </button>
      
      <div className="relative text-sm font-extrabold uppercase tracking-[0.18em] text-ideation-accent mb-2">
        Current prompt
      </div>
      <h2 className="relative pr-10 text-xl font-semibold leading-relaxed text-ideation-secondary md:text-2xl dark:text-white">
        {state.currentPrompt || 'Loading prompt...'}
      </h2>
      <div className="relative mt-3 flex items-center gap-2 text-sm text-foreground/60 dark:text-white/65">
        <Clock className="inline w-4 h-4 mr-1" />
        Generate as many ideas as possible in 1 minute
      </div>
    </div>
  );
}
