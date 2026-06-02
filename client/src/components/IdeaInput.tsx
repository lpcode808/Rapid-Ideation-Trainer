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
      <div className="flex space-x-3">
        <div className="flex-1">
          <input
            type="text"
            value={state.currentIdea}
            onChange={(e) => setCurrentIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your idea and press Enter..."
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-ideation-primary focus:ring-4 focus:ring-ideation-primary/20 outline-none transition-all text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-ideation-accent text-white rounded-lg hover:bg-ideation-accent/90 transition-colors flex items-center space-x-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
      
      {/* Idea Counter */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex space-x-4">
          <span className="text-ideation-secondary/70">
            Total Ideas: <span className="font-semibold text-ideation-accent">{state.totalIdeas}</span>
          </span>
          <span className="text-ideation-secondary/70">
            This Round: <span className="font-semibold text-ideation-primary">{state.currentRoundIdeas}</span>
          </span>
        </div>
        <div className="text-ideation-secondary/50 text-xs">
          <Keyboard className="inline w-4 h-4 mr-1" />
          Press Enter to submit
        </div>
      </div>
    </div>
  );
}
