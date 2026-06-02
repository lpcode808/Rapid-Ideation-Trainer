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
      <h3 className="text-lg font-semibold text-ideation-secondary dark:text-white mb-4 flex items-center">
        <Lightbulb className="text-ideation-warning mr-2" />
        Your Ideas
      </h3>
      
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {completedRounds.map(({ round, category, ideas }) => (
          <div key={round} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-ideation-secondary dark:text-white flex items-center">
                <div className="w-6 h-6 bg-ideation-primary text-white rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                  {round}
                </div>
                {category} Round
              </h4>
              <span className="text-xs text-ideation-secondary/60 dark:text-white/60">
                {ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'}
              </span>
            </div>
            
            {ideas.length > 0 ? (
              <div className="space-y-2">
                {ideas.map((idea, index) => (
                  <div
                    key={idea.id}
                    className="flex items-start space-x-3 p-2 bg-white dark:bg-gray-700 rounded border-l-2 border-ideation-primary/30"
                  >
                    <span className="text-xs text-ideation-secondary/60 dark:text-white/60 font-mono w-6 flex-shrink-0 mt-0.5">
                      {index + 1}.
                    </span>
                    <span className="text-ideation-secondary dark:text-white flex-1">{idea.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-ideation-secondary/40 dark:text-white/40 py-2">
                No ideas added yet
              </div>
            )}
          </div>
        ))}
        
        {hasNextRounds && (
          <div className="bg-gray-50/50 rounded-lg p-4 border-2 border-dashed border-gray-200">
            <div className="flex items-center justify-center text-ideation-secondary/40 py-4">
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
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center text-ideation-secondary/40">
              <Lightbulb className="mx-auto mb-2 w-8 h-8" />
              <p>Start the timer and begin adding ideas!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
