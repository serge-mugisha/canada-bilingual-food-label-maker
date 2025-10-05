import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';

export default function SectionOptionalBlocks() {
  const { t } = useTranslation();
  const { ingredients, manufacturer, setIngredients, setManufacturer } =
    useStore();

  return (
    <div className="space-y-6">
      {/* Ingredients */}
      <div>
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={ingredients.include}
            onChange={(e) => setIngredients({ include: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            {t('optional.ingredients')}
          </span>
        </label>

        {ingredients.include && (
          <div className="space-y-3 ml-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('optional.ingredientsEN')}
              </label>
              <textarea
                value={ingredients.listEN}
                onChange={(e) => setIngredients({ listEN: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('optional.ingredientsFR')}
              </label>
              <textarea
                value={ingredients.listFR}
                onChange={(e) => setIngredients({ listFR: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('optional.containsEN')}
              </label>
              <input
                type="text"
                value={ingredients.containsEN}
                onChange={(e) =>
                  setIngredients({ containsEN: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('optional.containsFR')}
              </label>
              <input
                type="text"
                value={ingredients.containsFR}
                onChange={(e) =>
                  setIngredients({ containsFR: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Manufacturer */}
      <div>
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={manufacturer.include}
            onChange={(e) => setManufacturer({ include: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            {t('optional.manufacturer')}
          </span>
        </label>

        {manufacturer.include && (
          <div className="space-y-3 ml-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('optional.manufacturerName')}
              </label>
              <input
                type="text"
                value={manufacturer.name}
                onChange={(e) => setManufacturer({ name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                {t('optional.manufacturerAddress')}
              </label>
              <textarea
                value={manufacturer.address}
                onChange={(e) =>
                  setManufacturer({ address: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
