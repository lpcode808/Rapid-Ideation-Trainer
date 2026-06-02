import { Brain, Target, Clock, Lightbulb } from 'lucide-react';

export function EducationalSection() {
  return (
    <div className="rounded-[2rem] border border-[hsl(var(--border))] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,247,235,0.76))] p-6 shadow-sm dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] md:p-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ideation-primary md:text-3xl">
          Melt Away Paralysis: The Science Behind Rapid Ideation
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-foreground/70 md:text-lg">
          Transform your creative thinking with research-backed techniques for generating high-volume ideas
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <div className="mb-4 flex items-center">
            <Target className="mr-3 text-ideation-accent" size={24} />
            <h3 className="text-xl font-semibold text-ideation-secondary dark:text-white">The Core Formula</h3>
          </div>
          <div className="mb-4 rounded-2xl bg-[rgba(7,168,168,0.10)] p-4 dark:bg-white/8">
            <p className="text-center font-mono text-base text-ideation-primary dark:text-white">
              Speed of Thought = <span className="font-bold">Max Ideas</span> / <span className="font-bold">Min Time</span>
            </p>
          </div>
          <p className="text-foreground/75">
            Research shows that generating higher quantities of ideas increases the likelihood of producing high-quality ones.
            The key is <strong>deferring judgment</strong> - worry about practicality later.
          </p>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
          <div className="mb-4 flex items-center">
            <Brain className="mr-3 text-ideation-warning" size={24} />
            <h3 className="text-xl font-semibold text-ideation-secondary dark:text-white">Breaking Through Blocks</h3>
          </div>
          <ul className="space-y-3 text-foreground/75">
            <li className="flex items-start">
              <span className="mr-2 text-ideation-warning">•</span>
              <span><strong>Paralysis:</strong> Overwhelmed by choices or blank page syndrome</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-ideation-warning">•</span>
              <span><strong>Judgment:</strong> Self-censoring "bad" ideas too early</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-ideation-warning">•</span>
              <span><strong>Volume Concern:</strong> Focusing on quality over quantity initially</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-6 flex items-center justify-center">
          <Lightbulb className="mr-3 text-ideation-warning" size={24} />
          <h3 className="text-center text-xl font-semibold text-ideation-secondary dark:text-white">
            The 4P Framework: Point → Line → Square → Cube
          </h3>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[rgba(0,53,113,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,235,0.86))] p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
            <div className="mb-3 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-ideation-primary font-bold text-white">1</div>
              <h4 className="font-semibold text-ideation-primary">Point</h4>
              <p className="text-xs text-foreground/55">Propositional</p>
            </div>
            <p className="text-sm leading-6 text-foreground/75">
              <strong>Easiest:</strong> List concrete things. Musical instruments, apps on your phone, positive moods.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(7,168,168,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,235,0.86))] p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
            <div className="mb-3 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-ideation-accent font-bold text-white">2</div>
              <h4 className="font-semibold text-ideation-accent">Line</h4>
              <p className="text-xs text-foreground/55">Procedural</p>
            </div>
            <p className="text-sm leading-6 text-foreground/75">
              <strong>Steps:</strong> How-to processes. Plan a picnic, apply for a job, make coffee.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(200,83,29,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,235,0.86))] p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
            <div className="mb-3 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-ideation-warning font-bold text-white">3</div>
              <h4 className="font-semibold text-ideation-warning">Square</h4>
              <p className="text-xs text-foreground/55">Perspective</p>
            </div>
            <p className="text-sm leading-6 text-foreground/75">
              <strong>Personal:</strong> Opinions and perspectives. Things you'll never eat, childhood PE activities.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(175,205,83,0.20)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,235,0.86))] p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
            <div className="mb-3 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-ideation-accent font-bold text-white">4</div>
              <h4 className="font-semibold text-[hsl(var(--accent))]">Cube</h4>
              <p className="text-xs text-foreground/55">Participatory</p>
            </div>
            <p className="text-sm leading-6 text-foreground/75">
              <strong>Hardest:</strong> Abstract solutions. Apps you wish existed, improving education systems.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[hsl(var(--border))] bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-white/6">
        <div className="mb-4 flex items-center">
          <Clock className="mr-3 text-ideation-accent" size={24} />
          <h3 className="text-xl font-semibold text-ideation-secondary dark:text-white">Practice Benchmarks</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[rgba(175,205,83,0.12)] p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-[hsl(var(--accent))]">50 ideas</div>
            <div className="font-medium text-ideation-accent">in 30 minutes</div>
            <div className="mt-1 text-sm text-foreground/55">Beginner Goal</div>
          </div>
          <div className="rounded-2xl bg-[rgba(7,168,168,0.12)] p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-ideation-accent">50 ideas</div>
            <div className="font-medium text-ideation-primary">in 5 minutes</div>
            <div className="mt-1 text-sm text-foreground/55">Expert Goal</div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-foreground/65">
          Start with comfortable timing and gradually increase speed. The goal is building your ideation muscle through deliberate practice.
        </p>
      </div>
    </div>
  );
}
