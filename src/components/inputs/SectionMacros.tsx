import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';

export default function SectionMacros() {
  const { t } = useTranslation();
  const { nutrients, setNutrients } = useStore();

  const updateNutrient = (key: keyof typeof nutrients, value: string) => {
    if (key === 'energy_kcal') {
      setNutrients({
        [key]: value ? Number(value) : null,
      });
    } else {
      const current = nutrients[key] || { amount: null, unit: 'g' };
      setNutrients({
        [key]: {
          ...current,
          amount: value ? Number(value) : null,
        },
      });
    }
  };

  return (
    <div className="space-y-3">
      <NutrientInput
        label={t('nutrients.energy_kcal')}
        value={nutrients.energy_kcal}
        unit="kcal"
        onChange={(v) => updateNutrient('energy_kcal', v)}
      />

      <NutrientInput
        label={t('nutrients.fat_total')}
        value={nutrients.fat_total?.amount}
        unit="g"
        onChange={(v) => updateNutrient('fat_total', v)}
      />

      <div className="ml-4 space-y-2">
        <NutrientInput
          label={t('nutrients.fat_saturated')}
          value={nutrients.fat_saturated?.amount}
          unit="g"
          onChange={(v) => updateNutrient('fat_saturated', v)}
          small
        />
        <NutrientInput
          label={t('nutrients.fat_trans')}
          value={nutrients.fat_trans?.amount}
          unit="g"
          onChange={(v) => updateNutrient('fat_trans', v)}
          small
        />
      </div>

      <NutrientInput
        label={t('nutrients.cholesterol')}
        value={nutrients.cholesterol?.amount}
        unit="mg"
        onChange={(v) => updateNutrient('cholesterol', v)}
      />

      <NutrientInput
        label={t('nutrients.sodium')}
        value={nutrients.sodium?.amount}
        unit="mg"
        onChange={(v) => updateNutrient('sodium', v)}
      />

      <NutrientInput
        label={t('nutrients.carbohydrate_total')}
        value={nutrients.carbohydrate_total?.amount}
        unit="g"
        onChange={(v) => updateNutrient('carbohydrate_total', v)}
      />

      <div className="ml-4 space-y-2">
        <NutrientInput
          label={t('nutrients.fiber')}
          value={nutrients.fiber?.amount}
          unit="g"
          onChange={(v) => updateNutrient('fiber', v)}
          small
        />
        <NutrientInput
          label={t('nutrients.sugars')}
          value={nutrients.sugars?.amount}
          unit="g"
          onChange={(v) => updateNutrient('sugars', v)}
          small
        />
      </div>

      <NutrientInput
        label={t('nutrients.protein')}
        value={nutrients.protein?.amount}
        unit="g"
        onChange={(v) => updateNutrient('protein', v)}
      />
    </div>
  );
}

function NutrientInput({
  label,
  value,
  unit,
  onChange,
  small = false,
}: {
  label: string;
  value: number | null | undefined;
  unit: string;
  onChange: (value: string) => void;
  small?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        className={`flex-1 text-sm ${
          small ? 'text-gray-600' : 'font-medium text-gray-700'
        }`}
      >
        {label}
      </label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="0"
          step="any"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="text-sm text-gray-500 w-8">{unit}</span>
      </div>
    </div>
  );
}
