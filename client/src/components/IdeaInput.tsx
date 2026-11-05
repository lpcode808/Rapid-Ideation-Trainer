import { useEffect, useRef } from 'react';
import { Plus, Keyboard } from 'lucide-react';
import { useSession } from '@/context/SessionContext';

export function IdeaInput() {
  const { state, setCurrentIdea, addIdea, startTimer } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const canSubmit = state.currentIdea.trim().length > 0;

  // Keep the cursor in the box when the timer starts and when rounds change,
  // so nobody has to click back in mid-sprint.
  useEffect(() => {
    if (state.isRunning) inputRef.current?.focus();
  }, [state.isRunning, state.currentRound]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    // First idea before pressing Start kicks off the clock.
    if (!state.isRunning && !state.isPaused && !state.sessionStartTime) startTimer();
    addIdea(state.currentIdea);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ignore Enter while an IME composition is in progress (e.g. Chinese/Japanese input).
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setCurrentIdea('');
    }
  };

  // The header already summarises the result once the session is over.
  if (state.isCompleted) return null;

  return (
    <div className="mb-6">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex-1">
          <label htmlFor="idea-input" className="sr-only">
            Your idea
          </label>
          <input
            id="idea-input"
            ref={inputRef}
            type="text"
            autoComplete="off"
            enterKeyHint="send"
            value={state.currentIdea}
            onChange={(e) => setCurrentIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your idea and press Enter..."
            className="w-full rounded-full border-2 border-[hsl(var(--border))] bg-white/90 px-5 py-3.5 text-lg text-ideation-secondary caret-ideation-accent outline-none transition-all placeholder:text-foreground/40 focus:border-ideation-accent focus:ring-4 focus:ring-[rgba(7,168,168,0.18)] dark:border-white/15 dark:bg-white/6 dark:text-white dark:placeholder:text-white/42"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          aria-label="Add idea"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ideation-accent px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:pointer-events-none disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </form>

      {/* Idea Counter */}
      <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex space-x-4" aria-live="polite">
          <span className="text-foreground/65">
            Total Ideas: <span className="font-semibold text-ideation-accent">{state.totalIdeas}</span>
          </span>
          <span className="text-foreground/65">
            This Round: <span className="font-semibold text-ideation-primary">{state.currentRoundIdeas}</span>
          </span>
        </div>
        <div className="hidden text-xs text-foreground/45 sm:block">
          <Keyboard className="inline w-4 h-4 mr-1" />
          Enter to add · Esc to clear
        </div>
      </div>
    </div>
  );
}
