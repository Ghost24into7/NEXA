'use client'

import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { useThemeStore, themes, ThemePreset } from '@/lib/stores/theme-store'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function Settings() {
  const { precision, setPrecision } = useCalculatorStore()
  const { currentTheme, setTheme, getActiveTheme } = useThemeStore()
  const theme = getActiveTheme()

  const handlePrecisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 10 && value <= 10000) {
      setPrecision(value)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6" style={{ color: theme.colors.foreground }}>
        Settings
      </h2>

      {/* Precision Setting */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
          Precision (decimal places)
        </label>
        <input
          type="number"
          min="10"
          max="10000"
          value={precision}
          onChange={handlePrecisionChange}
          className="w-full px-3 py-2 rounded-lg"
          style={{
            background: theme.colors.buttonBg,
            color: theme.colors.foreground,
            border: `1px solid ${theme.colors.border}`,
          }}
        />
        <p className="text-xs opacity-60 mt-1" style={{ color: theme.colors.foreground }}>
          Current: {precision} (min: 10, max: 10,000)
        </p>
      </div>

      {/* Theme Selection */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
          Theme
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(themes).map(([key, themeOption]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(key as ThemePreset)}
              className="relative p-3 rounded-lg text-left transition-all"
              style={{
                background: themeOption.colors.background,
                border: `2px solid ${
                  currentTheme === key ? themeOption.colors.primary : themeOption.colors.border
                }`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: themeOption.colors.foreground }}>
                  {themeOption.name}
                </span>
                {currentTheme === key && (
                  <Check className="w-4 h-4" style={{ color: themeOption.colors.primary }} />
                )}
              </div>
              <div className="flex gap-1 mt-2">
                {[
                  themeOption.colors.primary,
                  themeOption.colors.secondary,
                  themeOption.colors.accent,
                ].map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: theme.colors.foreground }}>
            Animations
          </span>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: theme.colors.foreground }}>
            Sound Effects
          </span>
          <input type="checkbox" className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: theme.colors.foreground }}>
            Haptic Feedback
          </span>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>
      </div>
    </div>
  )
}
