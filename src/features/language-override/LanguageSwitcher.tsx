import { DropdownMenu } from 'radix-ui';
import { readOverride, writeOverride, type SupportedLocale } from './overrideStore';
import styles from './LanguageSwitcher.module.scss';

// Language Switcher Component (T-008) — hydrated dropdown built on the
// Accessible Primitives Layer (Radix UI's DropdownMenu), which supplies
// the keyboard/ARIA menu semantics Feature UX's UX Constraints require.
// Unplaced: hosting within section-navigation's nav bar/mobile overlay is
// T-012's own responsibility (language-override/technical-design.md).

const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['en', 'es', 'eu'];

// Display labels and the closed-trigger's displayed value are Pending in
// language-override/ux.md and ui.md ("exact display strings... Pending").
// Locale codes stand in as an Implementation Placeholder so the
// functional mechanism (Commitments 1, 2; contributes to 4) is fully
// verifiable now, without inventing the final copy decision.
const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'EN',
  es: 'ES',
  eu: 'EU',
};

export default function LanguageSwitcher() {
  const activeOverride = readOverride();

  function handleSelect(locale: SupportedLocale) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (locale === activeOverride) {
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

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger}>
        {activeOverride === 'unset' ? LOCALE_LABELS.en : LOCALE_LABELS[activeOverride]}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {SUPPORTED_LOCALES.map((locale) => (
            <DropdownMenu.Item key={locale} asChild>
              <a
                href={`/${locale}/`}
                onClick={handleSelect(locale)}
                className={locale === activeOverride ? `${styles.item} ${styles.itemActive}` : styles.item}
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
