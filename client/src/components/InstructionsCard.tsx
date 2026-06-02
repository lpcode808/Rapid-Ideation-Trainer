import { Info } from 'lucide-react';

export function InstructionsCard() {
  return (
    <div className="bg-ideation-surface rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-ideation-secondary mb-4 flex items-center">
        <Info className="text-ideation-primary mr-2" />
        How It Works
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm text-ideation-secondary/80">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-ideation-primary text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="font-medium text-ideation-secondary">Four Categories</div>
              <div>Point, Line, Square, Cube - each with unique prompts</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-ideation-primary text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="font-medium text-ideation-secondary">Timed Rounds</div>
              <div>60 seconds per category, 4 minutes total</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-ideation-primary text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="font-medium text-ideation-secondary">Rapid Entry</div>
              <div>Type ideas quickly and press Enter to submit</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-ideation-primary text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <div className="font-medium text-ideation-secondary">Export Results</div>
              <div>Get a markdown report of all your ideas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
