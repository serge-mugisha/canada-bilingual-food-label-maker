import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Title, ServingLine, HeaderBand, Row, Separator } from '../atoms/LabelAtoms';
import {
  computePercentDV,
  formatAmount,
  formatPercent,
  shouldShowNutrient,
} from '../../lib/rulesEngine';
import type { DVConfig, RulesConfig } from '../../types';

export default function TemplateCanadaStandard() {
  const { serving, nutrients, micros, ingredients, manufacturer, style } = useStore();
  const [dvConfig, setDvConfig] = useState<DVConfig | null>(null);
  const [rules, setRules] = useState<RulesConfig | null>(null);

  useEffect(() => {
    // Load config files
    Promise.all([
      fetch('/config/dv_canada.json').then((r) => r.json()),
      fetch('/config/rules_canada.json').then((r) => r.json()),
    ]).then(([dv, r]) => {
      setDvConfig(dv);
      setRules(r);
    });
  }, []);

  if (!dvConfig || !rules) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  const isBold = style.boldness === 'heavy';

  // Format serving line
  const servingText = (() => {
    const parts: string[] = [];
    if (serving.servingSizeQuantity) {
      parts.push(serving.servingSizeQuantity);
    }
    if (serving.servingSizeUnitEN && serving.servingSizeUnitFR) {
      parts.push(`(${serving.servingSizeMetricValue || 0} ${serving.servingSizeMetricUnit || 'g'})`);
    }
    return parts.length > 0
      ? `Per / par ${parts.join(' ')}`
      : 'Per serving / par portion';
  })();

  // Calculate nutrients with rules
  const calcNutrient = (key: keyof typeof nutrients) => {
    if (key === 'energy_kcal') {
      const value = nutrients[key];
      return {
        amount: value ?? null,
        displayAmount: value !== null && value !== undefined ? `${Math.round(value)}` : '0',
        percentDV: null,
        displayPercent: null,
      };
    }

    const nutrient = nutrients[key];
    if (!nutrient || !('amount' in nutrient)) return null;

    const amount = nutrient.amount;
    const unit = nutrient.unit;

    if (!shouldShowNutrient(key, amount, rules)) return null;

    const percentDV = computePercentDV(key, amount, unit, dvConfig);
    const displayAmount = formatAmount(key, amount, unit, rules);
    const displayPercent = percentDV !== null ? formatPercent(key, percentDV, rules) : null;

    return { amount, displayAmount, percentDV, displayPercent };
  };

  const calcMicro = (key: keyof typeof micros) => {
    const micro = micros[key];
    if (!micro || !('amount' in micro)) return null;

    const amount = micro.amount;
    const unit = micro.unit;

    if (!shouldShowNutrient(key, amount, rules)) return null;

    const percentDV = computePercentDV(key, amount, unit, dvConfig);
    const displayAmount = formatAmount(key, amount, unit, rules);
    const displayPercent = percentDV !== null ? formatPercent(key, percentDV, rules) : null;

    return { amount, displayAmount, percentDV, displayPercent };
  };

  const calories = calcNutrient('energy_kcal');
  const fat = calcNutrient('fat_total');
  const saturated = calcNutrient('fat_saturated');
  const trans = calcNutrient('fat_trans');
  const cholesterol = calcNutrient('cholesterol');
  const sodium = calcNutrient('sodium');
  const carbs = calcNutrient('carbohydrate_total');
  const fiber = calcNutrient('fiber');
  const sugars = calcNutrient('sugars');
  const protein = calcNutrient('protein');

  const vitaminD = calcMicro('vitaminD');
  const calcium = calcMicro('calcium');
  const iron = calcMicro('iron');
  const potassium = calcMicro('potassium');

  return (
    <div
      className={`w-[400px] border-4 border-black p-3 ${
        isBold ? 'font-bold' : ''
      }`}
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        backgroundColor: style.showTransparentBackground ? 'transparent' : 'white',
      }}
    >
      <Title />
      <Separator weight="heavy" />
      <ServingLine text={servingText} />
      <Separator weight="normal" />

      {/* Calories Band */}
      {calories && (
        <HeaderBand>
          <div className="flex justify-between items-center px-4">
            <span>Calories / Calories</span>
            <span>{calories.displayAmount}</span>
          </div>
        </HeaderBand>
      )}

      <div className="py-2">
        <div className="flex justify-end text-xs font-bold mb-1">
          <span>% Daily Value / % valeur quotidienne</span>
        </div>
        <Separator weight="normal" />

        {/* Fat */}
        {fat && (
          <>
            <Row
              label="Fat / Lipides"
              amount={fat.displayAmount}
              percentDV={fat.displayPercent}
              bold
            />
            <Separator weight="light" />
          </>
        )}

        {/* Saturated */}
        {saturated && (
          <>
            <Row
              label="Saturated / saturés"
              amount={saturated.displayAmount}
              percentDV={saturated.displayPercent}
              indent
            />
            <Separator weight="light" />
          </>
        )}

        {/* Trans */}
        {trans && (
          <>
            <Row
              label="Trans / trans"
              amount={trans.displayAmount}
              percentDV={trans.displayPercent}
              indent
            />
            <Separator weight="light" />
          </>
        )}

        {/* Cholesterol */}
        {cholesterol && (
          <>
            <Row
              label="Cholesterol / Cholestérol"
              amount={cholesterol.displayAmount}
              percentDV={cholesterol.displayPercent}
            />
            <Separator weight="light" />
          </>
        )}

        {/* Sodium */}
        {sodium && (
          <>
            <Row
              label="Sodium / Sodium"
              amount={sodium.displayAmount}
              percentDV={sodium.displayPercent}
            />
            <Separator weight="light" />
          </>
        )}

        {/* Carbohydrate */}
        {carbs && (
          <>
            <Row
              label="Carbohydrate / Glucides"
              amount={carbs.displayAmount}
              percentDV={carbs.displayPercent}
              bold
            />
            <Separator weight="light" />
          </>
        )}

        {/* Fiber */}
        {fiber && (
          <>
            <Row
              label="Fibre / Fibres"
              amount={fiber.displayAmount}
              percentDV={fiber.displayPercent}
              indent
            />
            <Separator weight="light" />
          </>
        )}

        {/* Sugars */}
        {sugars && (
          <>
            <Row
              label="Sugars / Sucres"
              amount={sugars.displayAmount}
              percentDV={sugars.displayPercent}
              indent
            />
            <Separator weight="light" />
          </>
        )}

        {/* Protein */}
        {protein && (
          <>
            <Row
              label="Protein / Protéines"
              amount={protein.displayAmount}
              percentDV={protein.displayPercent}
            />
            <Separator weight="normal" />
          </>
        )}
      </div>

      {/* Micronutrients */}
      <div className="space-y-1">
        {vitaminD && (
          <Row
            label="Vitamin D / Vitamine D"
            amount={vitaminD.displayAmount}
            percentDV={vitaminD.displayPercent}
          />
        )}
        {calcium && (
          <Row
            label="Calcium / Calcium"
            amount={calcium.displayAmount}
            percentDV={calcium.displayPercent}
          />
        )}
        {iron && (
          <Row
            label="Iron / Fer"
            amount={iron.displayAmount}
            percentDV={iron.displayPercent}
          />
        )}
        {potassium && (
          <Row
            label="Potassium / Potassium"
            amount={potassium.displayAmount}
            percentDV={potassium.displayPercent}
          />
        )}
      </div>

      {/* Ingredients */}
      {ingredients.include && (ingredients.listEN || ingredients.listFR) && (
        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <div className="text-xs">
            {ingredients.listEN && (
              <div className="mb-2">
                <span className="font-bold">Ingredients: </span>
                {ingredients.listEN}
              </div>
            )}
            {ingredients.listFR && (
              <div className="mb-2">
                <span className="font-bold">Ingrédients: </span>
                {ingredients.listFR}
              </div>
            )}
            {(ingredients.containsEN || ingredients.containsFR) && (
              <div className="mt-2">
                {ingredients.containsEN && <div>{ingredients.containsEN}</div>}
                {ingredients.containsFR && <div>{ingredients.containsFR}</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manufacturer */}
      {manufacturer.include && (manufacturer.name || manufacturer.address) && (
        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <div className="text-xs">
            {manufacturer.name && <div className="font-bold">{manufacturer.name}</div>}
            {manufacturer.address && <div>{manufacturer.address}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
