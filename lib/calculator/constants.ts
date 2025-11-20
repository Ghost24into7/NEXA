import { math } from './engine'

/**
 * Mathematical constants library
 */
export const constants = {
  // Universal constants
  pi: { symbol: 'π', value: Math.PI, name: 'Pi', description: 'Ratio of circle circumference to diameter' },
  e: { symbol: 'e', value: Math.E, name: "Euler's number", description: 'Base of natural logarithm' },
  phi: { symbol: 'φ', value: (1 + Math.sqrt(5)) / 2, name: 'Golden ratio', description: 'Golden ratio' },
  
  // Physical constants
  c: { symbol: 'c', value: 299792458, name: 'Speed of light', description: 'Speed of light in vacuum (m/s)' },
  h: { symbol: 'h', value: 6.62607015e-34, name: 'Planck constant', description: 'Planck constant (J⋅s)' },
  G: { symbol: 'G', value: 6.67430e-11, name: 'Gravitational constant', description: 'Gravitational constant (m³⋅kg⁻¹⋅s⁻²)' },
  g: { symbol: 'g', value: 9.80665, name: 'Standard gravity', description: 'Standard gravity (m/s²)' },
  e0: { symbol: 'ε₀', value: 8.8541878128e-12, name: 'Vacuum permittivity', description: 'Vacuum permittivity (F/m)' },
  mu0: { symbol: 'μ₀', value: 1.25663706212e-6, name: 'Vacuum permeability', description: 'Vacuum permeability (H/m)' },
  k: { symbol: 'k', value: 1.380649e-23, name: 'Boltzmann constant', description: 'Boltzmann constant (J/K)' },
  Na: { symbol: 'Nₐ', value: 6.02214076e23, name: 'Avogadro constant', description: 'Avogadro constant (mol⁻¹)' },
  R: { symbol: 'R', value: 8.314462618, name: 'Gas constant', description: 'Universal gas constant (J⋅mol⁻¹⋅K⁻¹)' },
  me: { symbol: 'mₑ', value: 9.1093837015e-31, name: 'Electron mass', description: 'Electron mass (kg)' },
  mp: { symbol: 'mₚ', value: 1.67262192369e-27, name: 'Proton mass', description: 'Proton mass (kg)' },
  qe: { symbol: 'e', value: 1.602176634e-19, name: 'Elementary charge', description: 'Elementary charge (C)' },
  
  // Mathematical constants
  sqrt2: { symbol: '√2', value: Math.SQRT2, name: 'Square root of 2', description: 'Square root of 2' },
  sqrt3: { symbol: '√3', value: Math.sqrt(3), name: 'Square root of 3', description: 'Square root of 3' },
  ln2: { symbol: 'ln 2', value: Math.LN2, name: 'Natural log of 2', description: 'Natural logarithm of 2' },
  ln10: { symbol: 'ln 10', value: Math.LN10, name: 'Natural log of 10', description: 'Natural logarithm of 10' },
  log2e: { symbol: 'log₂e', value: Math.LOG2E, name: 'Base-2 log of e', description: 'Base-2 logarithm of e' },
  log10e: { symbol: 'log₁₀e', value: Math.LOG10E, name: 'Base-10 log of e', description: 'Base-10 logarithm of e' },
}

/**
 * Get constant by symbol
 */
export function getConstant(symbol: string): number | undefined {
  const constant = Object.values(constants).find(c => c.symbol === symbol || c.name === symbol)
  return constant?.value
}

/**
 * Search constants
 */
export function searchConstants(query: string): typeof constants[keyof typeof constants][] {
  const q = query.toLowerCase()
  return Object.values(constants).filter(
    c => c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
  )
}
