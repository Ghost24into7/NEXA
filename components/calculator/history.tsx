'use client'

import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { useThemeStore } from '@/lib/stores/theme-store'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Copy } from 'lucide-react'
import { format } from 'date-fns'

export function History() {
  const { history, deleteHistoryItem, clearHistory, setExpression } = useCalculatorStore()
  const { getActiveTheme } = useThemeStore()
  const theme = getActiveTheme()

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleUseExpression = (expression: string) => {
    setExpression(expression)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: theme.colors.foreground }}>
          History
        </h2>
        <button
          onClick={clearHistory}
          className="text-sm px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
          style={{ color: theme.colors.foreground }}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {history.length === 0 ? (
            <div className="text-center py-12 opacity-50" style={{ color: theme.colors.foreground }}>
              No calculations yet
            </div>
          ) : (
            history.map((item, index) => (
              <motion.div
                key={`${item.timestamp}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-3 rounded-lg hover:bg-white/5 transition-colors group"
                style={{ background: theme.colors.buttonBg }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm opacity-60 truncate cursor-pointer"
                      onClick={() => handleUseExpression(item.expression)}
                      style={{ color: theme.colors.foreground }}
                    >
                      {item.expression}
                    </div>
                    <div
                      className="text-lg font-semibold truncate"
                      style={{ color: theme.colors.primary }}
                    >
                      = {item.result}
                    </div>
                    <div className="text-xs opacity-40 mt-1" style={{ color: theme.colors.foreground }}>
                      {format(new Date(item.timestamp), 'MMM d, h:mm a')}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopyToClipboard(item.result)}
                      className="p-1 rounded hover:bg-white/10"
                      style={{ color: theme.colors.foreground }}
                      title="Copy result"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteHistoryItem(index)}
                      className="p-1 rounded hover:bg-white/10"
                      style={{ color: theme.colors.foreground }}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
