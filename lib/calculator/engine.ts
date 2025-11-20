import { create, all, ConfigOptions } from 'mathjs'
import Decimal from 'decimal.js'

// Configure math.js with arbitrary precision
const config: ConfigOptions = {
  number: 'BigNumber',
  precision: 64,
}

export const math = create(all, config)

// Configure Decimal.js for extreme precision
Decimal.set({ precision: 100, rounding: Decimal.ROUND_HALF_UP })

/**
 * Calculation result with metadata
 */
export interface CalculationResult {
  result: string
  expression: string
  timestamp: number
  mode: CalculationMode
  precision: number
  unit?: string
  error?: string
}

export type CalculationMode =
  | 'basic'
  | 'scientific'
  | 'graphing'
  | 'rpn'
  | 'programmer'
  | 'statistics'
  | 'financial'
  | 'matrix'
  | 'unit-converter'
  | 'date-time'

/**
 * Main calculation engine with arbitrary precision
 */
export class CalculatorEngine {
  private precision: number = 64

  constructor(precision: number = 64) {
    this.precision = precision
    this.updatePrecision(precision)
  }

  /**
   * Update calculation precision
   */
  updatePrecision(precision: number): void {
    this.precision = Math.max(10, Math.min(10000, precision))
    math.config({ precision: this.precision })
    Decimal.set({ precision: this.precision })
  }

  /**
   * Evaluate mathematical expression with arbitrary precision
   */
  evaluate(expression: string): string {
    try {
      // Preprocess expression
      const processed = this.preprocessExpression(expression)
      
      // Evaluate using math.js
      const result = math.evaluate(processed)
      
      // Format result
      return this.formatResult(result)
    } catch (error) {
      throw new Error(`Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Evaluate with Decimal.js for extreme precision
   */
  evaluateDecimal(expression: string): string {
    try {
      // Simple decimal arithmetic
      const result = new Decimal(expression)
      return result.toString()
    } catch (error) {
      // Fallback to math.js
      return this.evaluate(expression)
    }
  }

  /**
   * Solve symbolic equation
   */
  solve(equation: string, variable: string = 'x'): string[] {
    try {
      const solutions = math.solve(equation, variable)
      if (Array.isArray(solutions)) {
        return solutions.map((s) => this.formatResult(s))
      }
      return [this.formatResult(solutions)]
    } catch (error) {
      throw new Error(`Solve error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Simplify expression
   */
  simplify(expression: string): string {
    try {
      const simplified = math.simplify(expression)
      return simplified.toString()
    } catch (error) {
      throw new Error(`Simplify error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Differentiate expression
   */
  derivative(expression: string, variable: string = 'x'): string {
    try {
      const derivative = math.derivative(expression, variable)
      return derivative.toString()
    } catch (error) {
      throw new Error(`Derivative error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Calculate definite integral (numerical approximation)
   */
  integrate(expression: string, variable: string, from: number, to: number): string {
    try {
      // Use Simpson's rule for numerical integration
      const n = 1000 // Number of intervals
      const h = (to - from) / n
      
      const f = math.compile(expression)
      const scope = { [variable]: 0 }
      
      let sum = 0
      for (let i = 0; i <= n; i++) {
        const x = from + i * h
        scope[variable] = x
        const weight = i === 0 || i === n ? 1 : i % 2 === 0 ? 2 : 4
        sum += weight * (f.evaluate(scope) as number)
      }
      
      const result = (h / 3) * sum
      return this.formatResult(result)
    } catch (error) {
      throw new Error(`Integration error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Calculate statistical functions
   */
  statistics(data: number[]): {
    mean: string
    median: string
    mode: string[]
    stdDev: string
    variance: string
    min: string
    max: string
  } {
    return {
      mean: this.formatResult(math.mean(data)),
      median: this.formatResult(math.median(data)),
      mode: math.mode(data).map((m) => this.formatResult(m)),
      stdDev: this.formatResult(math.std(data)),
      variance: this.formatResult(math.variance(data)),
      min: this.formatResult(math.min(data)),
      max: this.formatResult(math.max(data)),
    }
  }

  /**
   * Matrix operations
   */
  matrixMultiply(a: number[][], b: number[][]): number[][] {
    return math.multiply(a, b) as number[][]
  }

  matrixInverse(matrix: number[][]): number[][] {
    return math.inv(matrix) as number[][]
  }

  matrixDeterminant(matrix: number[][]): string {
    return this.formatResult(math.det(matrix))
  }

  /**
   * Convert between number bases (programmer mode)
   */
  convertBase(value: string, fromBase: number, toBase: number): string {
    const decimal = parseInt(value, fromBase)
    return decimal.toString(toBase).toUpperCase()
  }

  /**
   * Preprocess expression for evaluation
   */
  private preprocessExpression(expression: string): string {
    let processed = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt')
      .replace(/∫/g, 'integrate')
      .trim()

    // Handle implicit multiplication
    processed = processed.replace(/(\d)(\()/g, '$1*$2')
    processed = processed.replace(/(\))(\d)/g, '$1*$2')
    processed = processed.replace(/(\))(\()/g, '$1*$2')

    return processed
  }

  /**
   * Format calculation result
   */
  private formatResult(result: any): string {
    if (typeof result === 'string') return result
    if (typeof result === 'number') {
      return result.toPrecision(Math.min(15, this.precision))
    }
    if (result.toString) {
      return result.toString()
    }
    return String(result)
  }
}

// Export singleton instance
export const calculator = new CalculatorEngine()
