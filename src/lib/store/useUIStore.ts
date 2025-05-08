'use client';

import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UIState {
  isLoading: boolean;
  error: string | null;
  isChatOpen: boolean;
  toast: {
    message: string;
    type: ToastType;
    isVisible: boolean;
  };
  toasts: Toast[];
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  toggleChat: () => void;
  setChatOpen: (isOpen: boolean) => void;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  error: null,
  isChatOpen: false,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },
  toasts: [],

  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  
  setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
  
  showToast: (message, type) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
      toast: {
        message,
        type,
        isVisible: true,
      },
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
        toast: {
          ...state.toast,
          isVisible: false,
        },
      }));
    }, 3000);
  },
  
  hideToast: () =>
    set((state) => ({
      toast: {
        ...state.toast,
        isVisible: false,
      },
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));