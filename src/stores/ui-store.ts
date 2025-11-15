/**
 * UI Store - Manages UI state (modals, notifications, etc.)
 */

import { create } from "zustand";

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

interface Modal {
  id: string;
  component: string;
  props?: Record<string, any>;
}

interface UIState {
  // Notifications
  notifications: Notification[];
  
  // Modals
  modals: Modal[];
  
  // Loading states
  loadingStates: Record<string, boolean>;
  
  // Actions - Notifications
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Actions - Modals
  openModal: (modal: Omit<Modal, "id">) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  
  // Actions - Loading
  setLoading: (key: string, loading: boolean) => void;
  clearLoading: (key: string) => void;
}

let notificationCounter = 0;
let modalCounter = 0;

export const useUIStore = create<UIState>((set) => ({
  notifications: [],
  modals: [],
  loadingStates: {},

  // Notification actions
  addNotification: (notification) => {
    const id = `notification-${notificationCounter++}`;
    const newNotification = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after duration
    if (notification.duration !== 0) {
      const duration = notification.duration || 5000;
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, duration);
    }
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),

  // Modal actions
  openModal: (modal) => {
    const id = `modal-${modalCounter++}`;
    set((state) => ({
      modals: [...state.modals, { ...modal, id }],
    }));
  },

  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    })),

  closeAllModals: () => set({ modals: [] }),

  // Loading actions
  setLoading: (key, loading) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [key]: loading,
      },
    })),

  clearLoading: (key) =>
    set((state) => {
      const newStates = { ...state.loadingStates };
      delete newStates[key];
      return { loadingStates: newStates };
    }),
}));

