import { Plus, Keyboard } from 'lucide-react';
import { useSession } from '@/context/SessionContext';

export function IdeaInput() {
  const { state, setCurrentIdea, addIdea } = useSession();

  const handleSubmit = () => {
    if (state.currentIdea.trim()) {
      addIdea(state.currentIdea);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            value={state.currentIdea}
            onChange={(e) => setCurrentIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your idea and press Enter..."
            className="w-full rounded-full border-2 border-[hsl(var(--border))] bg-white/90 px-5 py-3.5 text-lg text-ideation-secondary outline-none transition-all placeholder:text-foreground/40 focus:border-ideation-accent focus:ring-4 focus:ring-[rgba(7,168,168,0.18)] dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-white/42"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ideation-accent px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
      
      {/* Idea Counter */}
      <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex space-x-4">
          <span className="text-foreground/65">
            Total Ideas: <span className="font-semibold text-ideation-accent">{state.totalIdeas}</span>
          </span>
          <span className="text-foreground/65">
            This Round: <span className="font-semibold text-ideation-primary">{state.currentRoundIdeas}</span>
          </span>
        </div>
        <div className="text-xs text-foreground/45">
          <Keyboard className="inline w-4 h-4 mr-1" />
          Press Enter to submit
        </div>
      </div>
    </div>
  );
}
