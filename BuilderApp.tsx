'use client';

import App from './App';
import { LanguageProvider } from './LanguageContext';

export default function BuilderApp() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
