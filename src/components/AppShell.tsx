import { useState } from 'react';
import InputsPanel from './inputs/InputsPanel';
import LabelPreview from './preview/LabelPreview';
import ExportControls from './export/ExportControls';

export default function AppShell() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Inputs */}
        <div
          className={`lg:col-span-5 ${
            isPanelOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <InputsPanel />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-4">
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="lg:hidden mb-4 px-4 py-2 bg-gray-200 rounded-md"
            >
              {isPanelOpen ? 'Show Preview' : 'Show Inputs'}
            </button>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ExportControls />
              <div className="mt-6">
                <LabelPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
