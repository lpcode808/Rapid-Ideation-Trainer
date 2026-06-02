import { TimerSection } from '@/components/TimerSection';
import { RoundIndicator } from '@/components/RoundIndicator';
import { PromptDisplay } from '@/components/PromptDisplay';
import { IdeaInput } from '@/components/IdeaInput';
import { IdeaList } from '@/components/IdeaList';
import { ActionButtons } from '@/components/ActionButtons';
import { InstructionsCard } from '@/components/InstructionsCard';
import { EducationalSection } from '@/components/EducationalSection';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSession } from '@/context/SessionContext';
import { Trophy, Sparkles } from 'lucide-react';

export default function Home() {
  const { state } = useSession();

  return (
    <div className={`container mx-auto max-w-4xl px-4 py-6 min-h-screen transition-all duration-500 bg-background text-foreground ${
      state.isCompleted 
        ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600' 
        : ''
    }`}>
      {/* Header */}
      <header className="text-center mb-8 relative">
        {/* Theme toggle in top-right corner */}
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        
        {state.isCompleted ? (
          <div className="natural-bounce">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="text-white w-16 h-16 mr-4" />
              <Sparkles className="text-yellow-200 w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              🎉 Session Complete! 🎉
            </h1>
            <p className="text-orange-100 text-xl font-medium">
              Amazing work! You generated {state.totalIdeas} ideas in 4 minutes!
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-ideation-secondary mb-2">
              Fast Lightning Outburst Workout
            </h1>
            <p className="text-ideation-secondary/70 text-lg">
              Exercise your creativity with timed ideation rounds
            </p>
          </>
        )}
      </header>

      {/* Main Interface */}
      <div className={`rounded-xl shadow-lg p-6 md:p-8 mb-6 ${
        state.isCompleted 
          ? 'bg-white/95 backdrop-blur-sm' 
          : 'bg-ideation-surface'
      }`}>
        <TimerSection />
        <RoundIndicator />
        <PromptDisplay />
        <IdeaInput />
        <IdeaList />
        <ActionButtons />
      </div>

      {/* Instructions */}
      {!state.isCompleted && <InstructionsCard />}

      {/* Educational Section */}
      {!state.isCompleted && <EducationalSection />}

      {/* Video Section */}
      <div className="mt-8 mb-8">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/fXIeFJCqsPs"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-testid="video-player"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className={`text-center text-sm mt-8 ${
        state.isCompleted 
          ? 'text-orange-100' 
          : 'text-ideation-secondary/60'
      }`}>
        <p>Built for rapid creativity training • Session data saved locally</p>
        {state.isCompleted && (
          <p className="mt-2 text-white font-medium">
            🚀 Ready for another round? Click the reset button to start again!
          </p>
        )}
      </footer>
    </div>
  );
}
