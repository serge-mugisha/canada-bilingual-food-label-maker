import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { useStore } from '../../store';

export default function ExportControls() {
  const { t } = useTranslation();
  const { reset, loadExample } = useStore();
  const [scale, setScale] = useState<1 | 2 | 3>(2);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('label-preview');
      if (!element) {
        throw new Error('Label preview element not found');
      }

      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: scale,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `nutrition-label-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export label. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          {t('export.scale')}:
        </label>
        <select
          value={scale}
          onChange={(e) => setScale(Number(e.target.value) as 1 | 2 | 3)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="3">3x</option>
        </select>
      </div>

      <button
        onClick={handleExport}
        disabled={isExporting}
        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isExporting ? 'Exporting...' : t('export.downloadPNG')}
      </button>

      <button
        onClick={loadExample}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        {t('export.loadExample')}
      </button>

      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
      >
        {t('export.reset')}
      </button>
    </div>
  );
}
