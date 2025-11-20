import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CalculationResult, CalculationMode } from '@/lib/calculator/engine'

interface CalculatorState {
  // Current state
  display: string
  expression: string
  mode: CalculationMode
  precision: number
  
  // History
  history: CalculationResult[]
  
  // RPN stack
  rpnStack: string[]
  
  // Actions
  setDisplay: (display: string) => void
  setExpression: (expression: string) => void
  appendToExpression: (value: string) => void
  setMode: (mode: CalculationMode) => void
  setPrecision: (precision: number) => void
  addToHistory: (result: CalculationResult) => void
  clearHistory: () => void
  deleteHistoryItem: (index: number) => void
  clear: () => void
  clearExpression: () => void
  
  // RPN operations
  pushToRpnStack: (value: string) => void
  popFromRpnStack: () => string | undefined
  clearRpnStack: () => void
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      // Initial state
      display: '0',
      expression: '',
      mode: 'scientific',
      precision: 64,
      history: [],
      rpnStack: [],

      // Actions
      setDisplay: (display) => set({ display }),
      
      setExpression: (expression) => set({ expression }),
      
      appendToExpression: (value) => 
        set((state) => ({
          expression: state.expression + value,
          display: state.expression + value,
        })),
      
      setMode: (mode) => set({ mode }),
      
      setPrecision: (precision) => set({ precision }),
      
      addToHistory: (result) =>
        set((state) => ({
          history: [result, ...state.history].slice(0, 1000), // Keep last 1000
        })),
      
      clearHistory: () => set({ history: [] }),
      
      deleteHistoryItem: (index) =>
        set((state) => ({
          history: state.history.filter((_, i) => i !== index),
        })),
      
      clear: () =>
        set({
          display: '0',
          expression: '',
        }),
      
      clearExpression: () =>
        set({
          expression: '',
        }),
      
      // RPN operations
      pushToRpnStack: (value) =>
        set((state) => ({
          rpnStack: [...state.rpnStack, value],
        })),
      
      popFromRpnStack: () => {
        const stack = get().rpnStack
        if (stack.length === 0) return undefined
        const value = stack[stack.length - 1]
        set({ rpnStack: stack.slice(0, -1) })
        return value
      },
      
      clearRpnStack: () => set({ rpnStack: [] }),
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({
        mode: state.mode,
        precision: state.precision,
        history: state.history.slice(0, 100), // Persist only last 100
      }),
    }
  )
)
