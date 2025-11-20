'use client'

import { useThemeStore } from '@/lib/stores/theme-store'
import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { motion } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'

interface KeypadProps {
  onNumberClick: (num: string) => void
  onOperatorClick: (operator: string) => void
  onClear: () => void
  onEquals: () => void
  onFunction: (func: string) => void
}

const scientificButtons = [
  ['sin', 'cos', 'tan', 'ln', 'log'],
  ['π', 'e', '^', '√', '!'],
  ['(', ')', 'x', '÷', '⌫'],
  ['7', '8', '9', '+', 'C'],
  ['4', '5', '6', '-', 'EXP'],
  ['1', '2', '3', '×', 'ANS'],
  ['0', '.', '±', '=', '→'],
]

export function Keypad({
  onNumberClick,
  onOperatorClick,
  onClear,
  onEquals,
  onFunction,
}: KeypadProps) {
  const { getActiveTheme } = useThemeStore()
  const { mode } = useCalculatorStore()
  const theme = getActiveTheme()

  // Keyboard shortcuts
  useHotkeys('0,1,2,3,4,5,6,7,8,9', (e) => onNumberClick(e.key))
  useHotkeys('+,-,*,/', (e) => {
    e.preventDefault()
    onOperatorClick(e.key)
  })
  useHotkeys('enter', (e) => {
    e.preventDefault()
    onEquals()
  })
  useHotkeys('escape,c', (e) => {
    e.preventDefault()
    onClear()
  })
  useHotkeys('backspace', (e) => {
    e.preventDefault()
    // Handle backspace
  })

  const handleButtonClick = (button: string) => {
    // Play haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }

    if (button === '=') {
      onEquals()
    } else if (button === 'C') {
      onClear()
    } else if (button === '⌫') {
      // Backspace
      // Handle backspace logic
    } else if (['sin', 'cos', 'tan', 'ln', 'log', '√'].includes(button)) {
      onFunction(button)
    } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(button)) {
      onNumberClick(button)
    } else if (['+', '-', '×', '÷', '^', '(', ')'].includes(button)) {
      onOperatorClick(button)
    } else if (button === 'π') {
      onNumberClick('pi')
    } else if (button === 'e') {
      onNumberClick('e')
    }
  }

  const getButtonStyle = (button: string) => {
    if (button === '=') {
      return {
        background: theme.colors.primary,
        color: theme.colors.background,
      }
    } else if (['+', '-', '×', '÷', '^'].includes(button)) {
      return {
        background: theme.colors.operatorBg,
        color: theme.colors.background,
      }
    } else if (['C', '⌫'].includes(button)) {
      return {
        background: theme.colors.destructive || theme.colors.accent,
        color: theme.colors.background,
      }
    } else {
      return {
        background: theme.colors.numberBg,
        color: theme.colors.foreground,
      }
    }
  }

  return (
    <div className="grid gap-2">
      {scientificButtons.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((button) => (
            <motion.button
              key={button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick(button)}
              className="h-14 rounded-xl font-semibold text-lg transition-all shadow-lg no-select"
              style={{
                ...getButtonStyle(button),
                boxShadow: theme.effects.shadows
                  ? '0 2px 8px rgba(0,0,0,0.1)'
                  : 'none',
              }}
            >
              {button}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  )
}
