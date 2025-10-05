import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';

export default function SectionMicros() {
  const { t } = useTranslation();
  const { micros, setMicros } = useStore();

  const updateMicro = (key: keyof typeof micros, value: string) => {
    const current = micros[key] || { amount: null, unit: 'mg' };
    setMicros({
      [key]: {
        ...current,
        amount: value ? Number(value) : null,
      },
    });
  };

  return (
    <div className="space-y-3">
      <MicroInput
        label={t('nutrients.vitaminD')}
        value={micros.vitaminD?.amount}
        unit="mcg"
        onChange={(v) => updateMicro('vitaminD', v)}
      />

      <MicroInput
        label={t('nutrients.calcium')}
        value={micros.calcium?.amount}
        unit="mg"
        onChange={(v) => updateMicro('calcium', v)}
      />

      <MicroInput
        label={t('nutrients.iron')}
        value={micros.iron?.amount}
        unit="mg"
        onChange={(v) => updateMicro('iron', v)}
      />

      <MicroInput
        label={t('nutrients.potassium')}
        value={micros.potassium?.amount}
        unit="mg"
        onChange={(v) => updateMicro('potassium', v)}
      />
    </div>
  );
}

function MicroInput({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: number | null | undefined;
  unit: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="flex-1 text-sm font-medium text-gray-700">
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
        <span className="text-sm text-gray-500 w-10">{unit}</span>
      </div>
    </div>
  );
}
