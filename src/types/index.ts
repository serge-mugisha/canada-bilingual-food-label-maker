export type Unit = 'g' | 'mg' | 'mcg' | 'mL' | 'kcal';
export type TemplateId = 'canada-standard' | 'canada-simplified' | 'canada-dual-column';

export interface ServingInfo {
  servingsPerContainer?: number;
  servingSizeQuantity?: string;
  servingSizeUnitEN?: string;
  servingSizeUnitFR?: string;
  servingSizeMetricValue?: number;
  servingSizeMetricUnit?: Unit;
  referenceAmount?: number | null;
  referenceAmountUnit?: Unit;
}

export interface NutrientAmount {
  amount: number | null;
  unit: Unit;
}

export interface Nutrients {
  energy_kcal?: number | null;
  fat_total?: NutrientAmount;
  fat_saturated?: NutrientAmount;
  fat_trans?: NutrientAmount;
  cholesterol?: NutrientAmount;
  sodium?: NutrientAmount;
  carbohydrate_total?: NutrientAmount;
  fiber?: NutrientAmount;
  sugars?: NutrientAmount;
  protein?: NutrientAmount;
  mono?: NutrientAmount;
  poly?: NutrientAmount;
  omega3?: NutrientAmount;
  omega6?: NutrientAmount;
  sugar_alcohols?: NutrientAmount;
  starch?: NutrientAmount;
  potassium?: NutrientAmount;
}

export interface Micros {
  vitaminD?: NutrientAmount;
  calcium?: NutrientAmount;
  iron?: NutrientAmount;
  potassium?: NutrientAmount;
}

export interface IngredientsBlock {
  include: boolean;
  listEN: string;
  listFR: string;
  containsEN: string;
  containsFR: string;
}

export interface ManufacturerBlock {
  include: boolean;
  name: string;
  address: string;
}

export interface StyleOptions {
  template: TemplateId;
  widthScale: number;
  boldness: 'normal' | 'heavy';
  showTransparentBackground: boolean;
  showServingsPerContainer: boolean;
}

export interface AppState {
  serving: ServingInfo;
  nutrients: Nutrients;
  micros: Micros;
  ingredients: IngredientsBlock;
  manufacturer: ManufacturerBlock;
  style: StyleOptions;
}

export interface DVReference {
  dv: number | null;
  unit: Unit;
  showPercent: boolean;
}

export interface NutrientRule {
  amountDecimals?: number;
  thresholdZero?: number;
  percentDecimals?: number;
  showPercent?: boolean;
  forceShowZero?: boolean;
}

export interface RulesConfig {
  defaultPercentRounding: number;
  nutrients: Record<string, NutrientRule>;
}

export interface DVConfig {
  [key: string]: DVReference;
}

export interface ComputedNutrient {
  nutrientKey: string;
  amount: number | null;
  unit: Unit;
  displayAmount: string;
  percentDV: number | null;
  displayPercent: string | null;
  showPercent: boolean;
}
