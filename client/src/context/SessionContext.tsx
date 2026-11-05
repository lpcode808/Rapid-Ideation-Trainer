import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

export interface Idea {
  id: string;
  text: string;
  round: number;
  category: string;
  timestamp: number;
}

export interface SessionState {
  // Timer state
  sessionTime: number; // seconds remaining
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  
  // Round state
  currentRound: number;
  currentCategory: string;
  currentPrompt: string;
  
  // Ideas state
  ideas: Idea[];
  currentIdea: string;
  
  // Prompts data
  prompts: Record<string, string[]>;
  roundPrompts: Record<number, string>;
  
  // Session metadata
  sessionStartTime: number | null;
  totalIdeas: number;
  currentRoundIdeas: number;
}

type SessionAction =
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'TICK' }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_CURRENT_IDEA'; payload: string }
  | { type: 'ADD_IDEA'; payload: string }
  | { type: 'REMOVE_IDEA'; payload: string }
  | { type: 'ADVANCE_ROUND' }
  | { type: 'SKIP_TO_NEXT_ROUND' }
  | { type: 'SHUFFLE_PROMPT' }
  | { type: 'LOAD_PROMPTS'; payload: Record<string, string[]> }
  | { type: 'LOAD_SESSION'; payload: Partial<SessionState> };

const CATEGORIES = ['Point', 'Line', 'Square', 'Cube'];

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
const ROUND_DURATION = 60; // seconds
const TOTAL_SESSION_TIME = 240; // 4 minutes

const initialState: SessionState = {
  sessionTime: TOTAL_SESSION_TIME,
  isRunning: false,
  isPaused: false,
  isCompleted: false,
  currentRound: 1,
  currentCategory: 'Point',
  currentPrompt: '',
  ideas: [],
  currentIdea: '',
  prompts: {},
  roundPrompts: {},
  sessionStartTime: null,
  totalIdeas: 0,
  currentRoundIdeas: 0,
};

function getRandomPrompt(prompts: Record<string, string[]>, category: string): string {
  const categoryPrompts = prompts[category] || [];
  if (categoryPrompts.length === 0) return `Generate ideas for: ${category}`;
  return categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
}

function getNextPromptState(
  prompts: Record<string, string[]>,
  round: number,
  category: string,
  roundPrompts: Record<number, string>,
) {
  const prompt = getRandomPrompt(prompts, category);

  return {
    currentPrompt: prompt,
    roundPrompts: {
      ...roundPrompts,
      [round]: prompt,
    },
  };
}

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        sessionStartTime: state.sessionStartTime || Date.now(),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        isRunning: false,
        isPaused: true,
      };

    case 'RESUME_TIMER':
      return {
        ...state,
        isRunning: true,
        isPaused: false,
      };

    case 'TICK':
      if (!state.isRunning || state.sessionTime <= 0) return state;
      
      const tickNewSessionTime = state.sessionTime - 1;
      const timeElapsed = TOTAL_SESSION_TIME - tickNewSessionTime;
      const expectedRound = Math.min(Math.floor(timeElapsed / ROUND_DURATION) + 1, 4);
      
      // Check if we need to advance to the next round
      if (expectedRound > state.currentRound && expectedRound <= 4) {
        const newCategory = CATEGORIES[expectedRound - 1];
        const nextPromptState = getNextPromptState(
          state.prompts,
          expectedRound,
          newCategory,
          state.roundPrompts,
        );
        return {
          ...state,
          sessionTime: tickNewSessionTime,
          currentRound: expectedRound,
          currentCategory: newCategory,
          currentPrompt: nextPromptState.currentPrompt,
          roundPrompts: nextPromptState.roundPrompts,
          currentIdea: '',
          currentRoundIdeas: 0,
        };
      }
      
      // Stop timer when session is complete
      if (tickNewSessionTime <= 0) {
        return {
          ...state,
          sessionTime: 0,
          isRunning: false,
          isPaused: false,
          isCompleted: true,
        };
      }
      
      return {
        ...state,
        sessionTime: tickNewSessionTime,
      };

    case 'RESET_SESSION':
      return {
        ...initialState,
        prompts: state.prompts,
        ...getNextPromptState(state.prompts, 1, 'Point', {}),
      };

    case 'SET_CURRENT_IDEA':
      return {
        ...state,
        currentIdea: action.payload,
      };

    case 'ADD_IDEA':
      if (!action.payload.trim()) return state;
      
      const newIdea: Idea = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: action.payload.trim(),
        round: state.currentRound,
        category: state.currentCategory,
        timestamp: Date.now(),
      };
      
      const newIdeas = [...state.ideas, newIdea];
      const currentRoundIdeas = newIdeas.filter(idea => idea.round === state.currentRound).length;
      
      return {
        ...state,
        ideas: newIdeas,
        currentIdea: '',
        totalIdeas: newIdeas.length,
        currentRoundIdeas,
      };

    case 'REMOVE_IDEA': {
      const remaining = state.ideas.filter(idea => idea.id !== action.payload);
      return {
        ...state,
        ideas: remaining,
        totalIdeas: remaining.length,
        currentRoundIdeas: remaining.filter(idea => idea.round === state.currentRound).length,
      };
    }

    case 'ADVANCE_ROUND': {
      if (state.currentRound >= 4) return state;
      
      const nextRound = state.currentRound + 1;
      const nextCategory = CATEGORIES[nextRound - 1];
      const nextPromptState = getNextPromptState(
        state.prompts,
        nextRound,
        nextCategory,
        state.roundPrompts,
      );
      
      return {
        ...state,
        currentRound: nextRound,
        currentCategory: nextCategory,
        currentPrompt: nextPromptState.currentPrompt,
        roundPrompts: nextPromptState.roundPrompts,
        currentIdea: '',
        currentRoundIdeas: 0,
      };
    }

    case 'SKIP_TO_NEXT_ROUND': {
      if (state.currentRound >= 4) return state;
      
      const skipToRound = state.currentRound + 1;
      const skipToCategory = CATEGORIES[skipToRound - 1];
      const skipNewSessionTime = TOTAL_SESSION_TIME - (skipToRound - 1) * ROUND_DURATION;
      const nextPromptState = getNextPromptState(
        state.prompts,
        skipToRound,
        skipToCategory,
        state.roundPrompts,
      );
      
      return {
        ...state,
        sessionTime: skipNewSessionTime,
        currentRound: skipToRound,
        currentCategory: skipToCategory,
        currentPrompt: nextPromptState.currentPrompt,
        roundPrompts: nextPromptState.roundPrompts,
        currentIdea: '',
        currentRoundIdeas: state.ideas.filter(idea => idea.round === skipToRound).length,
      };
    }

    case 'SHUFFLE_PROMPT': {
      const nextPromptState = getNextPromptState(
        state.prompts,
        state.currentRound,
        state.currentCategory,
        state.roundPrompts,
      );
      return {
        ...state,
        currentPrompt: nextPromptState.currentPrompt,
        roundPrompts: nextPromptState.roundPrompts,
      };
    }

    case 'LOAD_PROMPTS':
      // Keep a prompt restored from a saved session instead of re-rolling it.
      if (state.currentPrompt) {
        return { ...state, prompts: action.payload };
      }
      return {
        ...state,
        prompts: action.payload,
        ...getNextPromptState(
          action.payload,
          state.currentRound,
          state.currentCategory,
          state.roundPrompts,
        ),
      };

    case 'LOAD_SESSION':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

interface SessionContextType {
  state: SessionState;
  dispatch: React.Dispatch<SessionAction>;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetSession: () => void;
  addIdea: (idea: string) => void;
  setCurrentIdea: (idea: string) => void;
  advanceRound: () => void;
  skipToNextRound: () => void;
  shufflePrompt: () => void;
  formatTime: (seconds: number) => string;
  exportToMarkdown: () => string;
  removeIdea: (id: string) => void;
  saveSession: () => void;
  loadSession: () => void;
}

const STORAGE_KEY = 'ideationSession';

function persist(state: SessionState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sessionTime: state.sessionTime,
      currentRound: state.currentRound,
      currentCategory: state.currentCategory,
      ideas: state.ideas,
      sessionStartTime: state.sessionStartTime,
      totalIdeas: state.totalIdeas,
      currentRoundIdeas: state.currentRoundIdeas,
      currentPrompt: state.currentPrompt,
      roundPrompts: state.roundPrompts,
      isCompleted: state.isCompleted,
    }));
  } catch {
    // Storage full or unavailable; the session still works in memory.
  }
}

function readSaved(): Partial<SessionState> | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved) as Partial<SessionState>;
    // A session interrupted by a reload comes back paused, so the button reads "Resume".
    const interrupted = !!parsed.sessionStartTime && !parsed.isCompleted;
    return { ...parsed, isRunning: false, isPaused: interrupted };
  } catch (error) {
    console.error('Failed to load saved session:', error);
    return null;
  }
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  // Load prompts on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}prompts.json`)
      .then(response => response.json())
      .then(prompts => {
        dispatch({ type: 'LOAD_PROMPTS', payload: prompts });
      })
      .catch(error => {
        console.error('Failed to load prompts:', error);
        // Fallback prompts
        const fallbackPrompts = {
          Point: ['List 10 everyday objects you could use as tools in an emergency'],
          Line: ['Steps to make the perfect cup of coffee'],
          Square: ['Personal goals you want to achieve this year'],
          Cube: ['Apps you wish existed to solve daily problems'],
        };
        dispatch({ type: 'LOAD_PROMPTS', payload: fallbackPrompts });
      });
  }, []);

  // Timer effect
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (state.sessionStartTime) persist(state);
  }, [state]);

  // Load session from localStorage on mount
  useEffect(() => {
    const saved = readSaved();
    if (saved) dispatch({ type: 'LOAD_SESSION', payload: saved });
  }, []);

  // Show the countdown in the browser tab so it's visible from other tabs.
  useEffect(() => {
    const base = 'Rapid Ideation Trainer';
    if (state.isCompleted) document.title = `Done! ${state.totalIdeas} idea${state.totalIdeas === 1 ? '' : 's'} · ${base}`;
    else if (state.isRunning) document.title = `${formatTime(state.sessionTime)} · Round ${state.currentRound} · ${base}`;
    else if (state.isPaused) document.title = `Paused ${formatTime(state.sessionTime)} · ${base}`;
    else document.title = base;
  }, [state.isCompleted, state.isRunning, state.isPaused, state.sessionTime, state.currentRound, state.totalIdeas]);

  const startTimer = () => dispatch({ type: 'START_TIMER' });
  const pauseTimer = () => dispatch({ type: 'PAUSE_TIMER' });
  const resumeTimer = () => dispatch({ type: 'RESUME_TIMER' });
  const resetSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    dispatch({ type: 'RESET_SESSION' });
  };
  const addIdea = (idea: string) => dispatch({ type: 'ADD_IDEA', payload: idea });
  const removeIdea = (id: string) => dispatch({ type: 'REMOVE_IDEA', payload: id });
  const setCurrentIdea = (idea: string) => dispatch({ type: 'SET_CURRENT_IDEA', payload: idea });
  const advanceRound = () => dispatch({ type: 'ADVANCE_ROUND' });
  const skipToNextRound = () => dispatch({ type: 'SKIP_TO_NEXT_ROUND' });
  const shufflePrompt = () => dispatch({ type: 'SHUFFLE_PROMPT' });

  const exportToMarkdown = (): string => {
    const ideasByRound = CATEGORIES.reduce((acc, category, index) => {
      const roundNumber = index + 1;
      const roundIdeas = state.ideas.filter(idea => idea.round === roundNumber);
      acc[roundNumber] = { category, ideas: roundIdeas };
      return acc;
    }, {} as Record<number, { category: string; ideas: Idea[] }>);

    let markdown = `# Fast Lightning Outburst Workout - Session Report\n`;
    markdown += `**Total Ideas:** ${state.totalIdeas}\n`;
    markdown += `**Session Duration:** ${formatTime(TOTAL_SESSION_TIME - state.sessionTime)}\n`;
    markdown += `**Date:** ${new Date().toLocaleDateString()}\n\n`;

    for (let round = 1; round <= 4; round++) {
      const roundData = ideasByRound[round];
      markdown += `## Round ${round}: ${roundData.category}\n`;
      const roundPrompt =
        state.roundPrompts[round] || `Generate ideas for: ${roundData.category}`;
      
      markdown += `**Prompt:** ${roundPrompt}\n\n`;
      
      if (roundData.ideas.length === 0) {
        markdown += `_(No ideas this round)_\n\n`;
      } else {
        roundData.ideas.forEach((idea, index) => {
          markdown += `${index + 1}. ${idea.text}\n`;
        });
        markdown += '\n';
      }
    }

    markdown += `---\n*Generated by Fast Lightning Outburst Workout*`;
    return markdown;
  };

  const saveSession = () => {
    if (state.sessionStartTime) persist(state);
  };

  const loadSession = () => {
    const saved = readSaved();
    if (saved) dispatch({ type: 'LOAD_SESSION', payload: saved });
  };

  return (
    <SessionContext.Provider value={{
      state,
      dispatch,
      startTimer,
      pauseTimer,
      resumeTimer,
      resetSession,
      addIdea,
      removeIdea,
      setCurrentIdea,
      advanceRound,
      skipToNextRound,
      shufflePrompt,
      formatTime,
      exportToMarkdown,
      saveSession,
      loadSession,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
