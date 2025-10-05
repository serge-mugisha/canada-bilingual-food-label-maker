import { useStore } from '../../store';
import TemplateCanadaStandard from './TemplateCanadaStandard';
import TemplateCanadaSimplified from './TemplateCanadaSimplified';
import TemplateCanadaDual from './TemplateCanadaDual';

export default function LabelPreview() {
  const { style } = useStore();

  const renderTemplate = () => {
    switch (style.template) {
      case 'canada-standard':
        return <TemplateCanadaStandard />;
      case 'canada-simplified':
        return <TemplateCanadaSimplified />;
      case 'canada-dual-column':
        return <TemplateCanadaDual />;
      default:
        return <TemplateCanadaStandard />;
    }
  };

  return (
    <div className="flex justify-center">
      <div
        id="label-preview"
        style={{
          transform: `scale(${style.widthScale})`,
          transformOrigin: 'top center',
          backgroundColor: style.showTransparentBackground
            ? 'transparent'
            : 'white',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
