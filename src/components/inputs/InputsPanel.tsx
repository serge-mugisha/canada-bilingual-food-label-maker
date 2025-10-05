import { useTranslation } from 'react-i18next';
import SectionServing from './SectionServing';
import SectionMacros from './SectionMacros';
import SectionMicros from './SectionMicros';
import SectionOptionalBlocks from './SectionOptionalBlocks';
import SectionTemplateStyle from './SectionTemplateStyle';

export default function InputsPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Section title={t('inputs.servingInfo')}>
        <SectionServing />
      </Section>

      <Section title={t('inputs.macronutrients')}>
        <SectionMacros />
      </Section>

      <Section title={t('inputs.micronutrients')}>
        <SectionMicros />
      </Section>

      <Section title={t('inputs.optionalBlocks')}>
        <SectionOptionalBlocks />
      </Section>

      <Section title={t('inputs.templateStyle')}>
        <SectionTemplateStyle />
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}
