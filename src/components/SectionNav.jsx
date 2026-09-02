import { MicroInteraction } from '../animation/microInteraction.jsx'
import { useMotionMode } from '../animation/motionMode.js'
import { useLocaleContent } from '../locale/localeLayer.js'
import './SectionNav.scss'

// Canonical destination structure — single source, targeting App Shell's
// fixed section ids (Existing architectural guarantee), not those
// sections' own internal components. Reused by Mobile Nav Overlay once
// T-025 hosts it here, per this Feature's Technical Design.
const DESTINATIONS = [
  { id: 'home', targetId: 'hero' },
  { id: 'about', targetId: 'about' },
  { id: 'contact', targetId: 'contact' },
]

// Standalone, not yet mounted (App Shell composition is T-031's job) or
// hosting Mobile Nav Overlay (T-025's job — the trigger below is inert
// until then; Commitment 4 is explicitly realized jointly with T-025, not
// here).
function SectionNav() {
  const labels = useLocaleContent('nav')
  const reduced = useMotionMode() === 'reduced'

  function scrollAnchor(targetId) {
    const target = document.getElementById(targetId)
    if (!target) return
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav className="section-nav" aria-label={labels.menuLabel ?? 'Navigation'}>
      {/* Inline form (desktop-class). Presentation-form selection
          (Commitment 3) is CSS-driven — see SectionNav.scss — so exactly
          one of this list and the trigger below is ever visible,
          structurally, at any viewport width. */}
      <ul className="section-nav__inline">
        {DESTINATIONS.map(({ id, targetId }) => (
          <li key={id}>
            <MicroInteraction
              as="button"
              type="button"
              className="section-nav__link"
              onClick={() => scrollAnchor(targetId)}
            >
              {labels[id] ?? id}
            </MicroInteraction>
          </li>
        ))}
      </ul>
      <button type="button" className="section-nav__trigger" aria-label={labels.menuLabel ?? 'Menu'}>
        <span className="section-nav__trigger-icon" aria-hidden="true">
          ☰
        </span>
      </button>
    </nav>
  )
}

export default SectionNav
