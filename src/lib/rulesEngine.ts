import type { DVConfig, RulesConfig, NutrientAmount, Unit } from '../types';

/**
 * Convert units to a common base for calculations
 */
export function normalizeUnit(amount: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return amount;

  // Convert to mg as intermediate
  const toMg: Record<Unit, number> = {
    g: 1000,
    mg: 1,
    mcg: 0.001,
    mL: 1, // Treat mL as 1:1 for now (density assumed = 1)
    kcal: 1, // Special case, not converted
  };

  const fromMg: Record<Unit, number> = {
    g: 0.001,
    mg: 1,
    mcg: 1000,
    mL: 1,
    kcal: 1,
  };

  if (fromUnit === 'kcal' || toUnit === 'kcal') {
    return amount; // Don't convert calories
  }

  const inMg = amount * toMg[fromUnit];
  return inMg * fromMg[toUnit];
}

/**
 * Compute % Daily Value for a nutrient
 */
export function computePercentDV(
  nutrientKey: string,
  amount: number | null,
  unit: Unit,
  dvConfig: DVConfig
): number | null {
  if (amount === null || amount === 0) return null;

  const dvEntry = dvConfig[nutrientKey];
  if (!dvEntry || dvEntry.dv === null || !dvEntry.showPercent) {
    return null;
  }

  // Normalize to DV unit
  const normalizedAmount = normalizeUnit(amount, unit, dvEntry.unit);
  const percent = (normalizedAmount / dvEntry.dv) * 100;

  return percent;
}

/**
 * Round amount according to nutrient-specific rules
 */
export function roundAmount(
  nutrientKey: string,
  amount: number | null,
  rules: RulesConfig
): number {
  if (amount === null) return 0;

  const nutrientRule = rules.nutrients[nutrientKey];
  if (!nutrientRule) return Math.round(amount);

  const { thresholdZero = 0, amountDecimals = 0 } = nutrientRule;

  // Check if below threshold
  if (Math.abs(amount) < thresholdZero) {
    return 0;
  }

  // Round to specified decimals
  const factor = Math.pow(10, amountDecimals);
  return Math.round(amount * factor) / factor;
}

/**
 * Round percent DV according to rules
 */
export function roundPercent(
  nutrientKey: string,
  percent: number | null,
  rules: RulesConfig
): number | null {
  if (percent === null) return null;

  const nutrientRule = rules.nutrients[nutrientKey];
  const decimals = nutrientRule?.percentDecimals ?? rules.defaultPercentRounding;

  const factor = Math.pow(10, decimals);
  return Math.round(percent * factor) / factor;
}

/**
 * Format amount for display
 */
export function formatAmount(
  nutrientKey: string,
  amount: number | null,
  unit: Unit,
  rules: RulesConfig
): string {
  const rounded = roundAmount(nutrientKey, amount, rules);
  const nutrientRule = rules.nutrients[nutrientKey];
  const decimals = nutrientRule?.amountDecimals ?? 0;

  if (rounded === 0 && nutrientRule?.forceShowZero) {
    return `0${decimals > 0 ? '.' + '0'.repeat(decimals) : ''} ${unit}`;
  }

  if (rounded === 0) {
    return `0 ${unit}`;
  }

  return `${rounded.toFixed(decimals)} ${unit}`;
}

/**
 * Format percent DV for display
 */
export function formatPercent(
  nutrientKey: string,
  percent: number | null,
  rules: RulesConfig
): string | null {
  if (percent === null) return null;

  const rounded = roundPercent(nutrientKey, percent, rules);
  if (rounded === null) return null;

  // Show "< 1 %" for values that round to less than 1 but are greater than 0
  if (percent > 0 && rounded < 1) {
    return '< 1 %';
  }

  if (rounded === 0) {
    return '0 %';
  }

  const nutrientRule = rules.nutrients[nutrientKey];
  const decimals = nutrientRule?.percentDecimals ?? 0;
  return `${rounded.toFixed(decimals)} %`;
}

/**
 * Check if a nutrient should be shown
 */
export function shouldShowNutrient(
  nutrientKey: string,
  amount: number | null,
  rules: RulesConfig
): boolean {
  if (amount === null) return false;

  const nutrientRule = rules.nutrients[nutrientKey];
  if (!nutrientRule) return true;

  const { thresholdZero = 0, forceShowZero = false } = nutrientRule;

  // Always show if forced
  if (forceShowZero) return true;

  // Show if above threshold
  return Math.abs(amount) >= thresholdZero;
}
