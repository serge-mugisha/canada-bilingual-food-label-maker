import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';
import type { TemplateId } from '../../types';

export default function SectionTemplateStyle() {
  const { t } = useTranslation();
  const { style, setStyle } = useStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('template.selectTemplate')}
        </label>
        <select
          value={style.template}
          onChange={(e) =>
            setStyle({ template: e.target.value as TemplateId })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="canada-standard">{t('template.standard')}</option>
          <option value="canada-simplified">{t('template.simplified')}</option>
          <option value="canada-dual-column">
            {t('template.dualColumn')}
          </option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('template.widthScale')} ({Math.round(style.widthScale * 100)}%)
        </label>
        <input
          type="range"
          min="0.8"
          max="1.2"
          step="0.05"
          value={style.widthScale}
          onChange={(e) =>
            setStyle({ widthScale: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('template.boldness')}
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="normal"
              checked={style.boldness === 'normal'}
              onChange={(e) =>
                setStyle({ boldness: e.target.value as 'normal' | 'heavy' })
              }
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">{t('template.normal')}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="heavy"
              checked={style.boldness === 'heavy'}
              onChange={(e) =>
                setStyle({ boldness: e.target.value as 'normal' | 'heavy' })
              }
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">{t('template.heavy')}</span>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={style.showTransparentBackground}
            onChange={(e) =>
              setStyle({ showTransparentBackground: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            {t('template.transparentBackground')}
          </span>
        </label>
      </div>
    </div>
  );
}
