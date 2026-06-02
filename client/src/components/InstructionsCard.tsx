import { Info } from 'lucide-react';

export function InstructionsCard() {
  return (
    <div className="mb-6 rounded-[1.5rem] border border-[hsl(var(--border))] bg-white/84 p-6 shadow-sm dark:border-white/10 dark:bg-[rgba(255,255,255,0.06)]">
      <h3 className="mb-4 flex items-center text-lg font-semibold text-ideation-secondary dark:text-white">
        <Info className="mr-2 text-ideation-primary" />
        How It Works
      </h3>
      <div className="grid gap-4 text-sm text-foreground/75 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ideation-primary text-xs font-semibold text-white">
              1
            </div>
            <div>
              <div className="font-medium text-ideation-secondary dark:text-white">Four Categories</div>
              <div>Point, Line, Square, Cube - each with unique prompts</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ideation-primary text-xs font-semibold text-white">
              2
            </div>
            <div>
              <div className="font-medium text-ideation-secondary dark:text-white">Timed Rounds</div>
              <div>60 seconds per category, 4 minutes total</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ideation-primary text-xs font-semibold text-white">
              3
            </div>
            <div>
              <div className="font-medium text-ideation-secondary dark:text-white">Rapid Entry</div>
              <div>Type ideas quickly and press Enter to submit</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ideation-primary text-xs font-semibold text-white">
              4
            </div>
            <div>
              <div className="font-medium text-ideation-secondary dark:text-white">Export Results</div>
              <div>Get a markdown report of all your ideas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
