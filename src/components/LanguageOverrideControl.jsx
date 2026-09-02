import { useId, useState } from 'react'
import { MicroInteraction } from '../animation/microInteraction.jsx'
import { useMotionMode } from '../animation/motionMode.js'
import { SUPPORTED_LANGUAGES, setActiveLanguage, useActiveLanguage } from '../locale/localeLayer.js'
import './LanguageOverrideControl.scss'

const LANGUAGE_LABELS = { en: 'EN', es: 'ES' }

function LanguageOverrideControl() {
  const activeLanguage = useActiveLanguage()
  const reduced = useMotionMode() === 'reduced'
  const [isExpanded, setIsExpanded] = useState(false)
  const menuId = useId()

  function handleSelect(language) {
    setIsExpanded(false)
    if (language === activeLanguage) return
    setActiveLanguage(language)
  }

  return (
    <div className="language-override">
      <MicroInteraction
        as="button"
        type="button"
        className="language-override__trigger"
        aria-haspopup="true"
        aria-expanded={isExpanded}
        aria-controls={menuId}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {LANGUAGE_LABELS[activeLanguage] ?? activeLanguage.toUpperCase()}
      </MicroInteraction>
      <ul
        id={menuId}
        role="menu"
        className={[
          'language-override__menu',
          isExpanded && 'is-expanded',
          reduced && 'language-override__menu--reduced',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <li key={language} role="none">
            <MicroInteraction
              as="button"
              type="button"
              role="menuitem"
              className="language-override__option"
              aria-current={language === activeLanguage ? 'true' : undefined}
              tabIndex={isExpanded ? 0 : -1}
              onClick={() => handleSelect(language)}
            >
              {LANGUAGE_LABELS[language] ?? language.toUpperCase()}
            </MicroInteraction>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageOverrideControl
