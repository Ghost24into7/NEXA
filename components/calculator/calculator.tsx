'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { useThemeStore } from '@/lib/stores/theme-store'
import { calculator } from '@/lib/calculator/engine'
import { Display } from './display'
import { Keypad } from './keypad'
import { ModeSelector } from './mode-selector'
import { History } from './history'
import { Settings } from './settings'
import { Calculator as CalcIcon, History as HistoryIcon, Settings as SettingsIcon } from 'lucide-react'

export function Calculator() {
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const {
    display,
    expression,
    mode,
    precision,
    setDisplay,
    setExpression,
    appendToExpression,
    addToHistory,
    clear,
  } = useCalculatorStore()

  const { getActiveTheme } = useThemeStore()
  const theme = getActiveTheme()

  const handleNumberClick = (num: string) => {
    appendToExpression(num)
  }

  const handleOperatorClick = (operator: string) => {
    appendToExpression(operator)
  }

  const handleClear = () => {
    clear()
  }

  const handleEquals = () => {
    try {
      const result = calculator.evaluate(expression)
      setDisplay(result)
      addToHistory({
        expression,
        result,
        timestamp: Date.now(),
        mode,
        precision,
      })
      setExpression(result)
    } catch (error) {
      setDisplay('Error')
      console.error(error)
    }
  }

  const handleFunction = (func: string) => {
    appendToExpression(`${func}(`)
  }

  return (
    <div className="flex gap-4 max-w-7xl mx-auto">
      {/* Main Calculator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <div
          className="glass rounded-3xl p-6 shadow-2xl"
          style={{
            background: theme.colors.background,
            backdropFilter: theme.effects.blur ? 'blur(20px)' : 'none',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CalcIcon className="w-6 h-6" style={{ color: theme.colors.primary }} />
              <span className="text-lg font-semibold" style={{ color: theme.colors.foreground }}>
                Calculator
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: theme.colors.foreground }}
              >
                <HistoryIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: theme.colors.foreground }}
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <ModeSelector />

          {/* Display */}
          <Display />

          {/* Keypad */}
          <Keypad
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
            onClear={handleClear}
            onEquals={handleEquals}
            onFunction={handleFunction}
          />
        </div>
      </motion.div>

      {/* Side Panel */}
      {(showHistory || showSettings) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="w-80"
        >
          <div
            className="glass rounded-3xl p-6 shadow-2xl h-full"
            style={{
              background: theme.colors.background,
              backdropFilter: theme.effects.blur ? 'blur(20px)' : 'none',
            }}
          >
            {showHistory && <History />}
            {showSettings && <Settings />}
          </div>
        </motion.div>
      )}
    </div>
  )
}
