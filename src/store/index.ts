import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '../types';

interface AppStore extends AppState {
  // Actions
  setServing: (serving: Partial<AppState['serving']>) => void;
  setNutrients: (nutrients: Partial<AppState['nutrients']>) => void;
  setMicros: (micros: Partial<AppState['micros']>) => void;
  setIngredients: (ingredients: Partial<AppState['ingredients']>) => void;
  setManufacturer: (manufacturer: Partial<AppState['manufacturer']>) => void;
  setStyle: (style: Partial<AppState['style']>) => void;
  reset: () => void;
  loadExample: () => void;
}

const initialState: AppState = {
  serving: {
    servingsPerContainer: undefined,
    servingSizeQuantity: '',
    servingSizeUnitEN: '',
    servingSizeUnitFR: '',
    servingSizeMetricValue: undefined,
    servingSizeMetricUnit: 'g',
    referenceAmount: null,
    referenceAmountUnit: 'g',
  },
  nutrients: {
    energy_kcal: null,
    fat_total: { amount: null, unit: 'g' },
    fat_saturated: { amount: null, unit: 'g' },
    fat_trans: { amount: null, unit: 'g' },
    cholesterol: { amount: null, unit: 'mg' },
    sodium: { amount: null, unit: 'mg' },
    carbohydrate_total: { amount: null, unit: 'g' },
    fiber: { amount: null, unit: 'g' },
    sugars: { amount: null, unit: 'g' },
    protein: { amount: null, unit: 'g' },
  },
  micros: {
    vitaminD: { amount: null, unit: 'mcg' },
    calcium: { amount: null, unit: 'mg' },
    iron: { amount: null, unit: 'mg' },
    potassium: { amount: null, unit: 'mg' },
  },
  ingredients: {
    include: false,
    listEN: '',
    listFR: '',
    containsEN: '',
    containsFR: '',
  },
  manufacturer: {
    include: false,
    name: '',
    address: '',
  },
  style: {
    template: 'canada-standard',
    widthScale: 1.0,
    boldness: 'normal',
    showTransparentBackground: false,
    showServingsPerContainer: true,
  },
};

const exampleData: AppState = {
  serving: {
    servingsPerContainer: 8,
    servingSizeQuantity: '2/3 cup',
    servingSizeUnitEN: 'cup',
    servingSizeUnitFR: 'tasse',
    servingSizeMetricValue: 55,
    servingSizeMetricUnit: 'g',
    referenceAmount: 55,
    referenceAmountUnit: 'g',
  },
  nutrients: {
    energy_kcal: 230,
    fat_total: { amount: 8, unit: 'g' },
    fat_saturated: { amount: 1, unit: 'g' },
    fat_trans: { amount: 0, unit: 'g' },
    cholesterol: { amount: 0, unit: 'mg' },
    sodium: { amount: 160, unit: 'mg' },
    carbohydrate_total: { amount: 37, unit: 'g' },
    fiber: { amount: 4, unit: 'g' },
    sugars: { amount: 1, unit: 'g' },
    protein: { amount: 3, unit: 'g' },
  },
  micros: {
    vitaminD: { amount: 2, unit: 'mcg' },
    calcium: { amount: 260, unit: 'mg' },
    iron: { amount: 8, unit: 'mg' },
    potassium: { amount: 235, unit: 'mg' },
  },
  ingredients: {
    include: true,
    listEN: 'Whole grain oats, sugar, corn syrup, modified corn starch, honey, salt, tripotassium phosphate, canola oil.',
    listFR: 'Avoine à grains entiers, sucre, sirop de maïs, amidon de maïs modifié, miel, sel, phosphate tripotassique, huile de canola.',
    containsEN: 'Contains: Oats',
    containsFR: 'Contient: Avoine',
  },
  manufacturer: {
    include: true,
    name: 'Example Foods Inc.',
    address: '123 Main Street, Toronto, ON M5V 1A1',
  },
  style: {
    template: 'canada-standard',
    widthScale: 1.0,
    boldness: 'normal',
    showTransparentBackground: false,
    showServingsPerContainer: true,
  },
};

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,

      setServing: (serving) =>
        set((state) => ({
          serving: { ...state.serving, ...serving },
        })),

      setNutrients: (nutrients) =>
        set((state) => ({
          nutrients: { ...state.nutrients, ...nutrients },
        })),

      setMicros: (micros) =>
        set((state) => ({
          micros: { ...state.micros, ...micros },
        })),

      setIngredients: (ingredients) =>
        set((state) => ({
          ingredients: { ...state.ingredients, ...ingredients },
        })),

      setManufacturer: (manufacturer) =>
        set((state) => ({
          manufacturer: { ...state.manufacturer, ...manufacturer },
        })),

      setStyle: (style) =>
        set((state) => ({
          style: { ...state.style, ...style },
        })),

      reset: () => set(initialState),

      loadExample: () => set(exampleData),
    }),
    {
      name: 'canada-nutrition-label-storage',
    }
  )
);
