/**
 * User Store - Manages user session and preferences
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserPreferences {
  theme?: "light" | "dark" | "system";
  defaultCoinPair?: string;
  notifications?: boolean;
}

interface UserState {
  // User data
  userId: string | null;
  email: string | null;
  
  // Preferences
  preferences: UserPreferences;
  
  // Predictions tracking
  submittedPredictions: Set<string>; // coinpair keys
  
  // Actions
  setUser: (userId: string | null, email: string | null) => void;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  markPredictionSubmitted: (coinpair: string) => void;
  clearPredictionSubmissions: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      preferences: {
        theme: "system",
        notifications: true,
      },
      submittedPredictions: new Set(),

      setUser: (userId, email) => set({ userId, email }),

      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...newPreferences,
          },
        })),

      markPredictionSubmitted: (coinpair) =>
        set((state) => {
          const newSubmitted = new Set(state.submittedPredictions);
          newSubmitted.add(coinpair);
          return { submittedPredictions: newSubmitted };
        }),

      clearPredictionSubmissions: () =>
        set({ submittedPredictions: new Set() }),

      clearUser: () =>
        set({
          userId: null,
          email: null,
          submittedPredictions: new Set(),
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        preferences: state.preferences,
        // Don't persist submittedPredictions (server is source of truth)
      }),
    }
  )
);

