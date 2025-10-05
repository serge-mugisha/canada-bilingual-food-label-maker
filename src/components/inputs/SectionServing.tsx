import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';
import type { Unit } from '../../types';

export default function SectionServing() {
  const { t } = useTranslation();
  const { serving, setServing } = useStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('serving.servingsPerContainer')}
        </label>
        <input
          type="number"
          min="0"
          step="1"
          value={serving.servingsPerContainer || ''}
          onChange={(e) =>
            setServing({
              servingsPerContainer: e.target.value
                ? Number(e.target.value)
                : undefined,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('serving.servingSizeQuantity')}
        </label>
        <input
          type="text"
          value={serving.servingSizeQuantity || ''}
          onChange={(e) =>
            setServing({ servingSizeQuantity: e.target.value })
          }
          placeholder="e.g., 2/3 cup"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('serving.servingSizeUnitEN')}
          </label>
          <input
            type="text"
            value={serving.servingSizeUnitEN || ''}
            onChange={(e) =>
              setServing({ servingSizeUnitEN: e.target.value })
            }
            placeholder="cup"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('serving.servingSizeUnitFR')}
          </label>
          <input
            type="text"
            value={serving.servingSizeUnitFR || ''}
            onChange={(e) =>
              setServing({ servingSizeUnitFR: e.target.value })
            }
            placeholder="tasse"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('serving.servingSizeMetricValue')}
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={serving.servingSizeMetricValue || ''}
            onChange={(e) =>
              setServing({
                servingSizeMetricValue: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('serving.servingSizeMetricUnit')}
          </label>
          <select
            value={serving.servingSizeMetricUnit || 'g'}
            onChange={(e) =>
              setServing({ servingSizeMetricUnit: e.target.value as Unit })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="g">g</option>
            <option value="mg">mg</option>
            <option value="mL">mL</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('serving.referenceAmount')}
        </label>
        <input
          type="number"
          min="0"
          step="any"
          value={serving.referenceAmount || ''}
          onChange={(e) =>
            setServing({
              referenceAmount: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
