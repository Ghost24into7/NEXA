'use client'

import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { useThemeStore } from '@/lib/stores/theme-store'
import { motion } from 'framer-motion'
import { CalculationMode } from '@/lib/calculator/engine'

const modes: { id: CalculationMode; label: string; icon: string }[] = [
  { id: 'basic', label: 'Basic', icon: '🔢' },
  { id: 'scientific', label: 'Scientific', icon: '🔬' },
  { id: 'graphing', label: 'Graphing', icon: '📈' },
  { id: 'rpn', label: 'RPN', icon: '🔄' },
  { id: 'programmer', label: 'Programmer', icon: '💻' },
  { id: 'statistics', label: 'Statistics', icon: '📊' },
  { id: 'financial', label: 'Financial', icon: '💰' },
  { id: 'matrix', label: 'Matrix', icon: '🔷' },
  { id: 'unit-converter', label: 'Units', icon: '⚖️' },
  { id: 'date-time', label: 'Date/Time', icon: '📅' },
]

export function ModeSelector() {
  const { mode, setMode } = useCalculatorStore()
  const { getActiveTheme } = useThemeStore()
  const theme = getActiveTheme()

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
      {modes.map((m) => (
        <motion.button
          key={m.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMode(m.id)}
          className="relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
          style={{
            background: mode === m.id ? theme.colors.primary : theme.colors.buttonBg,
            color: mode === m.id ? theme.colors.background : theme.colors.foreground,
          }}
        >
          <span className="mr-1">{m.icon}</span>
          {m.label}
          {mode === m.id && (
            <motion.div
              layoutId="active-mode"
              className="absolute inset-0 rounded-lg"
              style={{
                background: theme.colors.primary,
                zIndex: -1,
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
