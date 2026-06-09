import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to SaaS-Data Engine",
          "landing_hero": "Transform Data Into Actionable Insights",
          "login": "Login",
          "logout": "Logout",
          // Add more later
        }
      },
      fr: {
        translation: {
          "welcome": "Bienvenue sur SaaS-Data Engine",
          "landing_hero": "Transformez vos données en insights actionnables",
          "login": "Connexion",
          "logout": "Déconnexion",
        }
      }
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
