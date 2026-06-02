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
import { Sparkles, Trophy } from 'lucide-react';

export default function Home() {
  const { state } = useSession();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-[-8rem] h-72 w-72 rounded-full bg-[rgba(7,168,168,0.18)] blur-3xl" />
        <div className="absolute right-[-5rem] top-16 h-80 w-80 rounded-full bg-[rgba(175,205,83,0.20)] blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-[rgba(200,83,29,0.10)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-ideation-accent">
              rapid ideation trainer
            </p>

            {state.isCompleted ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(0,19,41,0.22)] px-4 py-2 text-sm font-semibold text-white shadow-branded">
                  <Trophy className="h-4 w-4 text-[hsl(var(--accent))]" />
                  Session complete
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Great work.
                  </h1>
                  <Sparkles className="hidden h-8 w-8 text-[hsl(var(--accent))] sm:block" />
                </div>
                <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                  You generated {state.totalIdeas} ideas in 4 minutes. The session report is ready below.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-ideation-primary sm:text-5xl lg:text-6xl">
                  Fast Lightning Outburst Workout
                </h1>
                <p className="max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
                  A short, high-energy practice for getting ideas out before judgment kicks in.
                </p>
              </div>
            )}
          </div>

          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </header>

        <main
          className={`relative overflow-hidden rounded-[2rem] border shadow-branded ${
            state.isCompleted
              ? 'border-white/12 bg-[linear-gradient(180deg,rgba(0,19,41,0.92),rgba(0,53,113,0.88))] text-white'
              : 'surface-bright border-[hsl(var(--border))]'
          }`}
        >
          <div
            className={`absolute inset-0 opacity-60 ${
              state.isCompleted
                ? 'bg-[radial-gradient(circle_at_top_right,rgba(175,205,83,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(7,168,168,0.14),transparent_24%)]'
                : 'bg-[radial-gradient(circle_at_top_right,rgba(175,205,83,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(7,168,168,0.10),transparent_24%)]'
            }`}
          />

          <div className="relative p-5 sm:p-7 lg:p-10">
            <TimerSection />
            <RoundIndicator />
            <PromptDisplay />
            <IdeaInput />
            <IdeaList />
            <ActionButtons />
          </div>
        </main>

        {!state.isCompleted && (
          <div className="mt-6 space-y-6">
            <InstructionsCard />
            <EducationalSection />
          </div>
        )}

        <div className="mt-8 mb-8">
          <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-[hsl(var(--border))] bg-white/70 shadow-branded">
            <div style={{ paddingBottom: '56.25%' }} />
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/fXIeFJCqsPs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              data-testid="video-player"
            />
          </div>
        </div>

        <footer
          className={`pb-2 text-center text-sm ${
            state.isCompleted ? 'text-white/75' : 'text-foreground/55'
          }`}
        >
          <p>Built for rapid creativity training • Session data saved locally</p>
          {state.isCompleted && (
            <p className="mt-2 font-medium text-white">
              Ready for another round? Reset to start again.
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
