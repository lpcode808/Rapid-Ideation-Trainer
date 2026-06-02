import { useSession } from '@/context/SessionContext';

export function RoundIndicator() {
  const { state } = useSession();

  const rounds = [1, 2, 3, 4];
  
  const getRoundColor = (round: number, isActive: boolean) => {
    if (!isActive) return 'border-[hsl(var(--border))] bg-white/55 text-foreground/35 dark:bg-white/6 dark:text-white/35';
    
    switch(round) {
      case 1: return 'bg-round-1 border-round-1 text-white';
      case 2: return 'bg-round-2 border-round-2 text-white';
      case 3: return 'bg-round-3 border-round-3 text-white';
      case 4: return 'bg-round-4 border-round-4 text-white';
      default: return 'bg-ideation-primary border-ideation-primary text-white';
    }
  };
  
  const getCurrentRoundAccentColor = () => {
    switch(state.currentRound) {
      case 1: return 'bg-[hsl(var(--round-1-color)/0.12)] text-round-1';
      case 2: return 'bg-[hsl(var(--round-2-color)/0.12)] text-round-2';
      case 3: return 'bg-[hsl(var(--round-3-color)/0.12)] text-round-3';
      case 4: return 'bg-[hsl(var(--round-4-color)/0.12)] text-round-4';
      default: return 'bg-[hsl(var(--ideation-primary)/0.12)] text-ideation-primary';
    }
  };
  
  const getCurrentRoundDotColor = () => {
    switch(state.currentRound) {
      case 1: return 'bg-round-1';
      case 2: return 'bg-round-2';
      case 3: return 'bg-round-3';
      case 4: return 'bg-round-4';
      default: return 'bg-ideation-primary';
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-center space-x-3">
        {rounds.map((round) => (
          <div
            key={round}
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm transition-all duration-300 ${
              getRoundColor(round, round <= state.currentRound)
            }`}
          >
            <span className="font-semibold">{round}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="mb-1 text-lg font-semibold text-ideation-secondary dark:text-white">
          Round {state.currentRound} of 4
        </div>
        <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold ${getCurrentRoundAccentColor()}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${getCurrentRoundDotColor()}`} />
          <span>{state.currentCategory}</span>
        </div>
      </div>
    </div>
  );
}
