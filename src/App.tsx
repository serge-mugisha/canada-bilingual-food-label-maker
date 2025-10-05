import { useTranslation } from 'react-i18next';
import AppShell from './components/AppShell';

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('app.title')}
            </h1>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
          </div>
        </div>
      </header>
      <main>
        <AppShell />
      </main>
    </div>
  );
}

export default App;
