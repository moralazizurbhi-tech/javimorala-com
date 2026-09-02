import { useState } from 'react'
import { MicroInteraction } from '../animation/microInteraction.jsx'
import { OverlayTransition } from '../animation/sectionPageMotion.jsx'
import './MobileNavOverlay.scss'

// Owns the Closed/Open lifecycle itself (Section Nav supplies the
// destination structure and the scroll-anchor callback, nothing else).
// Selection and closing are one state update in the same handler — never
// one without the other (Commitment 4 AC2). Dismissal only ever closes —
// no code path from the dismiss button reaches onSelect (Commitment 4 AC3).
// No scroll-blocking/locking is added anywhere (Commitment 5) — the
// overlay visually covers the viewport while Open, but the underlying
// page's own scroll capability is never touched.
function MobileNavOverlay({ destinations, onSelect, label }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleSelect(targetId) {
    setIsOpen(false)
    onSelect(targetId)
  }

  return (
    <>
      <button
        type="button"
        className="section-nav__trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={label}
        onClick={() => setIsOpen(true)}
      >
        <span className="section-nav__trigger-icon" aria-hidden="true">
          ☰
        </span>
      </button>
      <OverlayTransition
        as="div"
        isOpen={isOpen}
        className="mobile-nav-overlay"
        role="dialog"
        aria-label={label}
      >
        <button
          type="button"
          className="mobile-nav-overlay__dismiss"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
        <ul className="mobile-nav-overlay__list">
          {destinations.map(({ id, targetId, label: destinationLabel }) => (
            <li key={id}>
              <MicroInteraction
                as="button"
                type="button"
                className="mobile-nav-overlay__link"
                onClick={() => handleSelect(targetId)}
              >
                {destinationLabel}
              </MicroInteraction>
            </li>
          ))}
        </ul>
      </OverlayTransition>
    </>
  )
}

export default MobileNavOverlay
