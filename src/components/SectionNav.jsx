import { MicroInteraction } from '../animation/microInteraction.jsx'
import { useMotionMode } from '../animation/motionMode.js'
import { useLocaleContent } from '../locale/localeLayer.js'
import MobileNavOverlay from './MobileNavOverlay.jsx'
import './SectionNav.scss'

// Canonical destination structure — single source, targeting App Shell's
// fixed section ids (Existing architectural guarantee), not those
// sections' own internal components. Supplied to Mobile Nav Overlay below,
// not duplicated by it.
const DESTINATIONS = [
  { id: 'home', targetId: 'hero' },
  { id: 'about', targetId: 'about' },
  { id: 'contact', targetId: 'contact' },
]

// Standalone, not yet mounted (App Shell composition is T-031's job).
// Hosts Mobile Nav Overlay for the overlay-class form; Section Nav owns
// scroll-anchoring (Commitment 1) and only ever performs it via the
// scrollAnchor callback passed down — Mobile Nav Overlay never anchors
// directly.
function SectionNav() {
  const labels = useLocaleContent('nav')
  const reduced = useMotionMode() === 'reduced'

  function scrollAnchor(targetId) {
    const target = document.getElementById(targetId)
    if (!target) return
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  const destinations = DESTINATIONS.map(({ id, targetId }) => ({
    id,
    targetId,
    label: labels[id] ?? id,
  }))

  return (
    <nav className="section-nav" aria-label={labels.menuLabel ?? 'Navigation'}>
      {/* Inline form (desktop-class). Presentation-form selection
          (Commitment 3) is CSS-driven — see SectionNav.scss — so exactly
          one of this list and Mobile Nav Overlay's trigger below is ever
          visible, structurally, at any viewport width. */}
      <ul className="section-nav__inline">
        {destinations.map(({ id, targetId, label }) => (
          <li key={id}>
            <MicroInteraction
              as="button"
              type="button"
              className="section-nav__link"
              onClick={() => scrollAnchor(targetId)}
            >
              {label}
            </MicroInteraction>
          </li>
        ))}
      </ul>
      <MobileNavOverlay destinations={destinations} onSelect={scrollAnchor} label={labels.menuLabel ?? 'Menu'} />
    </nav>
  )
}

export default SectionNav
