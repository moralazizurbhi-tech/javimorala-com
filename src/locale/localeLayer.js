import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['en', 'es'];
const FALLBACK_LANGUAGE = 'en';
const SECTIONS = ['hero', 'about', 'contact'];

function buildResources() {
  const contentModules = import.meta.glob('../content/*/*.json', { eager: true });
  const resources = {};

  for (const path in contentModules) {
    const match = path.match(/\.\.\/content\/([^/]+)\/([^/]+)\.json$/);
    if (!match) continue;

    const [, locale, section] = match;
    const module = contentModules[path];

    resources[locale] ??= {};
    resources[locale][section] = module.default ?? module;
  }

  return resources;
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: buildResources(),
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    load: 'languageOnly',
    ns: SECTIONS,
    defaultNS: false,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export function useActiveLanguage() {
  const { i18n } = useTranslation();
  return i18n.language;
}

export function useLocaleContent(section) {
  const { i18n } = useTranslation(section);
  return i18n.getResourceBundle(i18n.language, section) ?? {};
}

export function setActiveLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }
  i18next.changeLanguage(language);
}

export { i18next };
