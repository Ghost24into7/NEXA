'use client'

import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { useThemeStore } from '@/lib/stores/theme-store'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function Display() {
  const { display, expression } = useCalculatorStore()
  const { getActiveTheme } = useThemeStore()
  const theme = getActiveTheme()
  const displayRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to end
  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth
    }
  }, [expression])

  return (
    <div
      className="relative rounded-2xl p-6 mb-6 min-h-[120px] flex flex-col justify-end overflow-hidden"
      style={{
        background: theme.colors.display,
        boxShadow: theme.effects.glow
          ? `0 0 30px ${theme.colors.primary}40, inset 0 0 20px ${theme.colors.primary}20`
          : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Expression */}
      <div
        ref={displayRef}
        className="text-right text-sm opacity-60 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none"
        style={{ color: theme.colors.displayText }}
      >
        {expression || '\u00A0'}
      </div>

      {/* Main Display */}
      <motion.div
        key={display}
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="text-right text-4xl font-bold font-mono overflow-x-auto whitespace-nowrap scrollbar-none"
        style={{ color: theme.colors.displayText }}
      >
        {display}
      </motion.div>

      {/* Cursor blink effect */}
      {expression && (
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute bottom-6 right-6 w-0.5 h-8"
          style={{ background: theme.colors.primary }}
        />
      )}
    </div>
  )
}
