import { describe, it, expect } from 'vitest';
import {
  normalizeUnit,
  computePercentDV,
  roundAmount,
  roundPercent,
  formatAmount,
  formatPercent,
  shouldShowNutrient,
} from './rulesEngine';
import type { DVConfig, RulesConfig } from '../types';

const mockDVConfig: DVConfig = {
  fat_total: { dv: 78, unit: 'g', showPercent: true },
  sodium: { dv: 2300, unit: 'mg', showPercent: true },
  vitaminD: { dv: 20, unit: 'mcg', showPercent: true },
  protein: { dv: null, unit: 'g', showPercent: false },
};

const mockRules: RulesConfig = {
  defaultPercentRounding: 0,
  nutrients: {
    fat_total: {
      amountDecimals: 1,
      thresholdZero: 0.5,
      percentDecimals: 0,
    },
    fat_saturated: {
      amountDecimals: 1,
      thresholdZero: 0.1,
      percentDecimals: 0,
    },
    fat_trans: {
      amountDecimals: 1,
      thresholdZero: 0.1,
      percentDecimals: 0,
      forceShowZero: true,
    },
    sodium: {
      amountDecimals: 0,
      thresholdZero: 5,
      percentDecimals: 0,
    },
  },
};

describe('normalizeUnit', () => {
  it('should return same value for same units', () => {
    expect(normalizeUnit(10, 'g', 'g')).toBe(10);
  });

  it('should convert g to mg', () => {
    expect(normalizeUnit(1, 'g', 'mg')).toBe(1000);
  });

  it('should convert mg to g', () => {
    expect(normalizeUnit(1000, 'mg', 'g')).toBe(1);
  });

  it('should convert mcg to mg', () => {
    expect(normalizeUnit(1000, 'mcg', 'mg')).toBe(1);
  });

  it('should not convert kcal', () => {
    expect(normalizeUnit(100, 'kcal', 'kcal')).toBe(100);
  });
});

describe('computePercentDV', () => {
  it('should compute correct percent DV for fat', () => {
    const result = computePercentDV('fat_total', 10, 'g', mockDVConfig);
    expect(result).toBeCloseTo(12.82, 1);
  });

  it('should compute correct percent DV for sodium', () => {
    const result = computePercentDV('sodium', 230, 'mg', mockDVConfig);
    expect(result).toBe(10);
  });

  it('should return null for nutrients without DV', () => {
    const result = computePercentDV('protein', 10, 'g', mockDVConfig);
    expect(result).toBeNull();
  });

  it('should return null for zero amount', () => {
    const result = computePercentDV('fat_total', 0, 'g', mockDVConfig);
    expect(result).toBeNull();
  });

  it('should return null for null amount', () => {
    const result = computePercentDV('fat_total', null, 'g', mockDVConfig);
    expect(result).toBeNull();
  });
});

describe('roundAmount', () => {
  it('should round to specified decimals', () => {
    const result = roundAmount('fat_total', 12.456, mockRules);
    expect(result).toBe(12.5);
  });

  it('should return 0 for values below threshold', () => {
    const result = roundAmount('fat_total', 0.3, mockRules);
    expect(result).toBe(0);
  });

  it('should handle null values', () => {
    const result = roundAmount('fat_total', null, mockRules);
    expect(result).toBe(0);
  });

  it('should round to integers for sodium', () => {
    const result = roundAmount('sodium', 123.7, mockRules);
    expect(result).toBe(124);
  });
});

describe('roundPercent', () => {
  it('should round percent to integer', () => {
    const result = roundPercent('fat_total', 12.6, mockRules);
    expect(result).toBe(13);
  });

  it('should handle null values', () => {
    const result = roundPercent('fat_total', null, mockRules);
    expect(result).toBeNull();
  });
});

describe('formatAmount', () => {
  it('should format with correct decimals', () => {
    const result = formatAmount('fat_total', 12.456, 'g', mockRules);
    expect(result).toBe('12.5 g');
  });

  it('should show 0 for below threshold', () => {
    const result = formatAmount('fat_total', 0.3, 'g', mockRules);
    expect(result).toBe('0 g');
  });

  it('should force show zero with decimals for trans fat', () => {
    const result = formatAmount('fat_trans', 0.05, 'g', mockRules);
    expect(result).toBe('0.0 g');
  });
});

describe('formatPercent', () => {
  it('should format percent with %', () => {
    const result = formatPercent('fat_total', 15, mockRules);
    expect(result).toBe('15 %');
  });

  it('should show "< 1 %" for small values', () => {
    const result = formatPercent('fat_total', 0.4, mockRules);
    expect(result).toBe('< 1 %');
  });

  it('should return null for null values', () => {
    const result = formatPercent('fat_total', null, mockRules);
    expect(result).toBeNull();
  });
});

describe('shouldShowNutrient', () => {
  it('should show nutrient above threshold', () => {
    const result = shouldShowNutrient('fat_total', 1.0, mockRules);
    expect(result).toBe(true);
  });

  it('should not show nutrient below threshold', () => {
    const result = shouldShowNutrient('fat_total', 0.3, mockRules);
    expect(result).toBe(false);
  });

  it('should force show trans fat even at 0', () => {
    const result = shouldShowNutrient('fat_trans', 0.05, mockRules);
    expect(result).toBe(true);
  });

  it('should not show null nutrients', () => {
    const result = shouldShowNutrient('fat_total', null, mockRules);
    expect(result).toBe(false);
  });
});
