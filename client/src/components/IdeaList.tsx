import { Lightbulb, Clock } from 'lucide-react';
import { useSession } from '@/context/SessionContext';

export function IdeaList() {
  const { state } = useSession();

  const categories = ['Point', 'Line', 'Square', 'Cube'];
  
  const ideasByRound = categories.reduce((acc, category, index) => {
    const roundNumber = index + 1;
    const roundIdeas = state.ideas.filter(idea => idea.round === roundNumber);
    acc[roundNumber] = { category, ideas: roundIdeas };
    return acc;
  }, {} as Record<number, { category: string; ideas: any[] }>);

  const getCompletedRounds = () => {
    const rounds = [];
    for (let round = 1; round <= 4; round++) {
      const roundData = ideasByRound[round];
      if (round < state.currentRound || (round === state.currentRound && roundData.ideas.length > 0)) {
        rounds.push({ round, ...roundData });
      }
    }
    return rounds;
  };

  const completedRounds = getCompletedRounds();
  const hasNextRounds = state.currentRound < 4 || (state.currentRound === 4 && state.sessionTime > 0);

  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-ideation-secondary dark:text-white">
        <Lightbulb className="mr-2 text-ideation-warning" />
        Your Ideas
      </h3>
      
      <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
        {completedRounds.map(({ round, category, ideas }) => (
          <div key={round} className="rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center font-medium text-ideation-secondary dark:text-white">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-ideation-primary text-xs font-semibold text-white">
                  {round}
                </div>
                {category} Round
              </h4>
              <span className="text-xs text-foreground/55 dark:text-white/60">
                {ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'}
              </span>
            </div>
            
            {ideas.length > 0 ? (
              <div className="space-y-2">
                {ideas.map((idea, index) => (
                  <div
                    key={idea.id}
                    className="flex items-start space-x-3 rounded-xl border-l-2 border-ideation-accent/30 bg-[rgba(255,255,255,0.8)] p-3 dark:bg-white/5"
                  >
                    <span className="mt-0.5 w-6 flex-shrink-0 font-mono text-xs text-foreground/55 dark:text-white/60">
                      {index + 1}.
                    </span>
                    <span className="text-ideation-secondary dark:text-white flex-1">{idea.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-2 text-center text-foreground/40 dark:text-white/40">
                No ideas added yet
              </div>
            )}
          </div>
        ))}
        
        {hasNextRounds && (
          <div className="rounded-2xl border-2 border-dashed border-[hsl(var(--border))] bg-[rgba(255,255,255,0.45)] p-4">
            <div className="flex items-center justify-center py-4 text-foreground/40">
              <Clock className="mr-2" />
              <span>
                {state.currentRound < 4 
                  ? `${categories[state.currentRound]} round will appear here...`
                  : 'Complete the current round to see results...'
                }
              </span>
            </div>
          </div>
        )}
        
        {completedRounds.length === 0 && !hasNextRounds && (
          <div className="rounded-2xl bg-white/70 p-8 shadow-sm dark:bg-white/6">
            <div className="text-center text-foreground/40">
              <Lightbulb className="mx-auto mb-2 w-8 h-8" />
              <p>Start the timer and begin adding ideas!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
