import { DropdownMenu } from 'radix-ui';
import { readOverride, writeOverride, type SupportedLocale } from './overrideStore';
import styles from './LanguageSwitcher.module.scss';

// Language Switcher Component (T-008) — hydrated dropdown built on the
// Accessible Primitives Layer (Radix UI's DropdownMenu), which supplies
// the keyboard/ARIA menu semantics Feature UX's UX Constraints require.
// Unplaced: hosting within section-navigation's nav bar/mobile overlay is
// T-012's own responsibility (language-override/technical-design.md).

const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['en', 'es', 'eu'];

const LOCALE_CODES: Record<SupportedLocale, string> = {
  en: 'EN',
  es: 'ES',
  eu: 'EU',
};

// Full display labels used by the open options.
const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'English',
  es: 'Castellano',
  eu: 'Euskara',
};

interface Props {
  // The current page's own resolved locale (content-localization's
  // routing) — used only as the closed trigger's fallback label when no
  // override is set yet (T-032 post-implementation correction: the
  // trigger previously hardcoded 'en' regardless of which locale route
  // was actually being viewed, showing "EN" on the es/eu routes for any
  // visitor without a persisted override — ui.md's own Component Anatomy
  // requires the trigger show the "current language label", not always
  // English). Optional/defaulted to 'en' so existing call sites (and
  // this component's own tests) that don't know the current route's
  // locale keep their prior behaviour unchanged.
  activeLocale?: SupportedLocale;
	variant?: 'desktop' | 'mobile';
}

export default function LanguageSwitcher({ activeLocale = 'en', variant = 'desktop' }: Props) {
  const activeOverride = readOverride();
  const selectedLocale = activeOverride === 'unset' ? activeLocale : activeOverride;

  function handleSelect(locale: SupportedLocale) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (locale === selectedLocale) {
        // Commitment 2: reselecting the active language is a no-op — no
        // write, no navigation.
        event.preventDefault();
        return;
      }

      // Commitment 1: write the override, then let the anchor's default
      // click behavior carry out the navigation.
      writeOverride(locale);
    };
  }

  if (variant === 'mobile') {
    return (
      <div className={styles.mobileOptions} role="group" aria-label="Language">
        {SUPPORTED_LOCALES.map((locale) => (
          <a
            key={locale}
            href={`/${locale}/`}
            onClick={handleSelect(locale)}
            className={locale === selectedLocale ? `${styles.mobileOption} ${styles.itemActive}` : styles.mobileOption}
            aria-current={locale === selectedLocale ? 'page' : undefined}
          >
            {LOCALE_CODES[locale]}
          </a>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className={styles.trigger}>
        {activeOverride === 'unset' ? LOCALE_CODES[activeLocale] : LOCALE_CODES[activeOverride]}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          side="bottom"
          align="end"
          sideOffset={8}
          collisionPadding={8}
        >
          {SUPPORTED_LOCALES.map((locale) => (
            <DropdownMenu.Item key={locale} asChild>
              <a
                href={`/${locale}/`}
                onClick={handleSelect(locale)}
					className={locale === selectedLocale ? `${styles.item} ${styles.itemActive}` : styles.item}
              >
                {LOCALE_LABELS[locale]}
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
