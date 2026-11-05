import { useEffect, useRef } from 'react';
import { Lightbulb, Clock, X } from 'lucide-react';
import { useSession, type Idea } from '@/context/SessionContext';

const CATEGORIES = ['Point', 'Line', 'Square', 'Cube'];

export function IdeaList() {
  const { state, removeIdea } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(state.ideas.length);

  // Follow the newest idea as it's added, but don't jump when ideas are removed.
  useEffect(() => {
    if (state.ideas.length > lastCount.current && scrollRef.current) {
      const el = scrollRef.current.querySelector<HTMLElement>(`[data-round="${state.currentRound}"]`);
      const target = el ?? scrollRef.current;
      scrollRef.current.scrollTop = target.offsetTop + target.offsetHeight - scrollRef.current.clientHeight;
    }
    lastCount.current = state.ideas.length;
  }, [state.ideas.length, state.currentRound]);

  const completedRounds = CATEGORIES.map((category, index) => {
    const round = index + 1;
    return { round, category, ideas: state.ideas.filter((idea) => idea.round === round) as Idea[] };
  }).filter(
    ({ round, ideas }) => round < state.currentRound || (round === state.currentRound && (ideas.length > 0 || state.isCompleted)),
  );

  const hasNextRounds = !state.isCompleted && (state.currentRound < 4 || state.sessionTime > 0);

  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-ideation-secondary dark:text-white">
        <Lightbulb className="mr-2 text-ideation-warning" />
        Your Ideas
      </h3>

      <div
        ref={scrollRef}
        className={`relative space-y-4 overflow-y-auto pr-1 ${state.isCompleted ? 'max-h-[32rem]' : 'max-h-72'}`}
      >
        {completedRounds.map(({ round, category, ideas }) => (
          <div
            key={round}
            data-round={round}
            className="rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-[rgba(255,255,255,0.06)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center font-medium text-ideation-secondary dark:text-white">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {round}
                </div>
                {category} Round
              </h4>
              <span className="text-xs text-foreground/55 dark:text-white/60">
                {ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'}
              </span>
            </div>

            {ideas.length > 0 ? (
              <ol className="space-y-2">
                {ideas.map((idea, index) => (
                  <li
                    key={idea.id}
                    className="group flex items-start space-x-3 rounded-xl border-l-2 border-ideation-accent/30 bg-[rgba(255,255,255,0.8)] p-3 dark:bg-[rgba(255,255,255,0.05)]"
                  >
                    <span className="mt-0.5 w-6 flex-shrink-0 font-mono text-xs text-foreground/55 dark:text-white/60">
                      {index + 1}.
                    </span>
                    <span className="flex-1 break-words text-ideation-secondary dark:text-white">{idea.text}</span>
                    <button
                      type="button"
                      onClick={() => removeIdea(idea.id)}
                      title="Remove idea"
                      aria-label={`Remove idea: ${idea.text}`}
                      className="-my-1 rounded-md p-1 text-foreground/40 opacity-100 transition-opacity hover:bg-black/5 hover:text-ideation-warning focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 dark:text-white/45 dark:hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="py-2 text-center text-foreground/40 dark:text-white/40">No ideas this round</div>
            )}
          </div>
        ))}

        {hasNextRounds && (
          <div className="rounded-2xl border-2 border-dashed border-[hsl(var(--border))] bg-[rgba(255,255,255,0.45)] p-4 dark:border-white/12 dark:bg-[rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-center py-4 text-center text-foreground/40 dark:text-white/50">
              <Clock className="mr-2 shrink-0" />
              <span>
                {state.currentRound < 4
                  ? `${CATEGORIES[state.currentRound]} round will appear here...`
                  : 'Last round: keep going!'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
