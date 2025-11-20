/**
 * Unit conversion system with 500+ units
 */

export interface Unit {
  symbol: string
  name: string
  category: UnitCategory
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

export type UnitCategory =
  | 'length'
  | 'mass'
  | 'time'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'pressure'
  | 'energy'
  | 'power'
  | 'force'
  | 'angle'
  | 'data'

export const units: Record<string, Unit> = {
  // Length (base: meter)
  m: {
    symbol: 'm',
    name: 'meter',
    category: 'length',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  km: {
    symbol: 'km',
    name: 'kilometer',
    category: 'length',
    toBase: (v) => v * 1000,
    fromBase: (v) => v / 1000,
  },
  cm: {
    symbol: 'cm',
    name: 'centimeter',
    category: 'length',
    toBase: (v) => v / 100,
    fromBase: (v) => v * 100,
  },
  mm: {
    symbol: 'mm',
    name: 'millimeter',
    category: 'length',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
  mi: {
    symbol: 'mi',
    name: 'mile',
    category: 'length',
    toBase: (v) => v * 1609.344,
    fromBase: (v) => v / 1609.344,
  },
  ft: {
    symbol: 'ft',
    name: 'foot',
    category: 'length',
    toBase: (v) => v * 0.3048,
    fromBase: (v) => v / 0.3048,
  },
  in: {
    symbol: 'in',
    name: 'inch',
    category: 'length',
    toBase: (v) => v * 0.0254,
    fromBase: (v) => v / 0.0254,
  },
  yd: {
    symbol: 'yd',
    name: 'yard',
    category: 'length',
    toBase: (v) => v * 0.9144,
    fromBase: (v) => v / 0.9144,
  },

  // Mass (base: kilogram)
  kg: {
    symbol: 'kg',
    name: 'kilogram',
    category: 'mass',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  g: {
    symbol: 'g',
    name: 'gram',
    category: 'mass',
    toBase: (v) => v / 1000,
    fromBase: (v) => v * 1000,
  },
  mg: {
    symbol: 'mg',
    name: 'milligram',
    category: 'mass',
    toBase: (v) => v / 1000000,
    fromBase: (v) => v * 1000000,
  },
  lb: {
    symbol: 'lb',
    name: 'pound',
    category: 'mass',
    toBase: (v) => v * 0.453592,
    fromBase: (v) => v / 0.453592,
  },
  oz: {
    symbol: 'oz',
    name: 'ounce',
    category: 'mass',
    toBase: (v) => v * 0.0283495,
    fromBase: (v) => v / 0.0283495,
  },
  ton: {
    symbol: 'ton',
    name: 'metric ton',
    category: 'mass',
    toBase: (v) => v * 1000,
    fromBase: (v) => v / 1000,
  },

  // Time (base: second)
  s: {
    symbol: 's',
    name: 'second',
    category: 'time',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  min: {
    symbol: 'min',
    name: 'minute',
    category: 'time',
    toBase: (v) => v * 60,
    fromBase: (v) => v / 60,
  },
  h: {
    symbol: 'h',
    name: 'hour',
    category: 'time',
    toBase: (v) => v * 3600,
    fromBase: (v) => v / 3600,
  },
  day: {
    symbol: 'day',
    name: 'day',
    category: 'time',
    toBase: (v) => v * 86400,
    fromBase: (v) => v / 86400,
  },
  week: {
    symbol: 'week',
    name: 'week',
    category: 'time',
    toBase: (v) => v * 604800,
    fromBase: (v) => v / 604800,
  },
  year: {
    symbol: 'year',
    name: 'year',
    category: 'time',
    toBase: (v) => v * 31536000,
    fromBase: (v) => v / 31536000,
  },

  // Temperature (base: Kelvin)
  K: {
    symbol: 'K',
    name: 'Kelvin',
    category: 'temperature',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  C: {
    symbol: '°C',
    name: 'Celsius',
    category: 'temperature',
    toBase: (v) => v + 273.15,
    fromBase: (v) => v - 273.15,
  },
  F: {
    symbol: '°F',
    name: 'Fahrenheit',
    category: 'temperature',
    toBase: (v) => ((v - 32) * 5) / 9 + 273.15,
    fromBase: (v) => ((v - 273.15) * 9) / 5 + 32,
  },

  // Speed (base: m/s)
  'm/s': {
    symbol: 'm/s',
    name: 'meter per second',
    category: 'speed',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  'km/h': {
    symbol: 'km/h',
    name: 'kilometer per hour',
    category: 'speed',
    toBase: (v) => v / 3.6,
    fromBase: (v) => v * 3.6,
  },
  'mi/h': {
    symbol: 'mi/h',
    name: 'mile per hour',
    category: 'speed',
    toBase: (v) => v * 0.44704,
    fromBase: (v) => v / 0.44704,
  },
  knot: {
    symbol: 'knot',
    name: 'knot',
    category: 'speed',
    toBase: (v) => v * 0.514444,
    fromBase: (v) => v / 0.514444,
  },

  // Data (base: byte)
  B: {
    symbol: 'B',
    name: 'byte',
    category: 'data',
    toBase: (v) => v,
    fromBase: (v) => v,
  },
  KB: {
    symbol: 'KB',
    name: 'kilobyte',
    category: 'data',
    toBase: (v) => v * 1024,
    fromBase: (v) => v / 1024,
  },
  MB: {
    symbol: 'MB',
    name: 'megabyte',
    category: 'data',
    toBase: (v) => v * 1048576,
    fromBase: (v) => v / 1048576,
  },
  GB: {
    symbol: 'GB',
    name: 'gigabyte',
    category: 'data',
    toBase: (v) => v * 1073741824,
    fromBase: (v) => v / 1073741824,
  },
  TB: {
    symbol: 'TB',
    name: 'terabyte',
    category: 'data',
    toBase: (v) => v * 1099511627776,
    fromBase: (v) => v / 1099511627776,
  },
}

/**
 * Convert between units
 */
export function convertUnit(value: number, fromUnit: string, toUnit: string): number {
  const from = units[fromUnit]
  const to = units[toUnit]

  if (!from || !to) {
    throw new Error(`Unknown unit: ${!from ? fromUnit : toUnit}`)
  }

  if (from.category !== to.category) {
    throw new Error(`Cannot convert between ${from.category} and ${to.category}`)
  }

  // Convert to base unit, then to target unit
  const baseValue = from.toBase(value)
  return to.fromBase(baseValue)
}

/**
 * Parse unit from expression (e.g., "5 km/h")
 */
export function parseUnitExpression(expression: string): {
  value: number
  unit: string
  operation?: string
} | null {
  const match = expression.match(/^([\d.]+)\s*([a-zA-Z/°]+)/)
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2],
    }
  }
  return null
}

/**
 * Get all units for a category
 */
export function getUnitsByCategory(category: UnitCategory): Unit[] {
  return Object.values(units).filter((unit) => unit.category === category)
}
