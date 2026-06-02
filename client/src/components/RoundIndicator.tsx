import { useSession } from '@/context/SessionContext';

export function RoundIndicator() {
  const { state } = useSession();

  const rounds = [1, 2, 3, 4];
  
  const getRoundColor = (round: number, isActive: boolean) => {
    if (!isActive) return 'border-gray-300 text-gray-400';
    
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
      case 1: return 'bg-round-1/10 text-round-1';
      case 2: return 'bg-round-2/10 text-round-2';
      case 3: return 'bg-round-3/10 text-round-3';
      case 4: return 'bg-round-4/10 text-round-4';
      default: return 'bg-ideation-primary/10 text-ideation-primary';
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
      <div className="flex items-center justify-center space-x-4 mb-4">
        {rounds.map((round) => (
          <div
            key={round}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              getRoundColor(round, round <= state.currentRound)
            }`}
          >
            <span className="font-semibold">{round}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="text-lg font-semibold text-ideation-secondary mb-1">
          Round {state.currentRound} of 4
        </div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCurrentRoundAccentColor()}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${getCurrentRoundDotColor()}`} />
          <span>{state.currentCategory}</span>
        </div>
      </div>
    </div>
  );
}
