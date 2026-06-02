import { Brain, Target, Clock, Lightbulb } from 'lucide-react';

export function EducationalSection() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-xl p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-ideation-secondary mb-3">
          Melt Away Paralysis: The Science Behind Rapid Ideation
        </h2>
        <p className="text-ideation-secondary/70 text-lg max-w-3xl mx-auto">
          Transform your creative thinking with research-backed techniques for generating high-volume ideas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Core Concept */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Target className="text-indigo-600 mr-3" size={24} />
            <h3 className="text-xl font-semibold text-ideation-secondary">The Core Formula</h3>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 mb-4">
            <p className="text-center font-mono text-lg text-indigo-700 dark:text-indigo-300">
              Speed of Thought = <span className="font-bold">Max Ideas</span> / <span className="font-bold">Min Time</span>
            </p>
          </div>
          <p className="text-ideation-secondary/80">
            Research shows that generating higher quantities of ideas increases the likelihood of producing high-quality ones. 
            The key is <strong>deferring judgment</strong> - worry about practicality later.
          </p>
        </div>

        {/* The Problem */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Brain className="text-red-500 mr-3" size={24} />
            <h3 className="text-xl font-semibold text-ideation-secondary">Breaking Through Blocks</h3>
          </div>
          <ul className="space-y-2 text-ideation-secondary/80">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span><strong>Paralysis:</strong> Overwhelmed by choices or blank page syndrome</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span><strong>Judgment:</strong> Self-censoring "bad" ideas too early</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span><strong>Volume Concern:</strong> Focusing on quality over quantity initially</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 4 Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <Lightbulb className="text-yellow-500 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-ideation-secondary">The 4P Framework: Point → Line → Square → Cube</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-950/30 dark:to-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <h4 className="font-semibold text-red-700 dark:text-red-300">Point</h4>
              <p className="text-xs text-red-600 dark:text-red-400">Propositional</p>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>Easiest:</strong> List concrete things. Musical instruments, apps on your phone, positive moods.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Line</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400">Procedural</p>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Steps:</strong> How-to processes. Plan a picnic, apply for a job, make coffee.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-950/30 dark:to-pink-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <h4 className="font-semibold text-pink-700 dark:text-pink-300">Square</h4>
              <p className="text-xs text-pink-600 dark:text-pink-400">Perspective</p>
            </div>
            <p className="text-sm text-pink-700 dark:text-pink-300">
              <strong>Personal:</strong> Opinions and perspectives. Things you'll never eat, childhood PE activities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/30 dark:to-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="text-center mb-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
              <h4 className="font-semibold text-green-700 dark:text-green-300">Cube</h4>
              <p className="text-xs text-green-600 dark:text-green-400">Participatory</p>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Hardest:</strong> Abstract solutions. Apps you wish existed, improving education systems.
            </p>
          </div>
        </div>
      </div>

      {/* Benchmarks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Clock className="text-green-600 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-ideation-secondary">Practice Benchmarks</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">50 ideas</div>
            <div className="text-green-700 dark:text-green-300 font-medium">in 30 minutes</div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-1">Beginner Goal</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">50 ideas</div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">in 5 minutes</div>
            <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">Expert Goal</div>
          </div>
        </div>
        <p className="text-center text-ideation-secondary/70 mt-4 text-sm">
          Start with comfortable timing and gradually increase speed. The goal is building your ideation muscle through deliberate practice.
        </p>
      </div>
    </div>
  );
}