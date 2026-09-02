import { MicroInteraction } from '../animation/microInteraction.jsx'
import { useLocaleContent } from '../locale/localeLayer.js'
import './SocialLinkGroup.scss'

// Canonical, locale-independent destination pair — Constraint: "Must not
// vary trigger destinations by locale, session, or which view hosts the
// instantiation." Handles are placeholders pending Javi's real profile
// URLs, same deferral as Hero/About's placeholder copy.
const CHANNELS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/CHANGE_ME' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/CHANGE_ME' },
]

// One reusable definition, not composed/mounted here — App Shell
// instantiates it twice (Hero, Contact) at T-030. Native <a target="_blank">
// per trigger, independently activatable, structurally guaranteeing
// Commitment 1 (no shared state between triggers, no form/backend call)
// and Commitment 3 (session-preserving — the current page is never
// replaced/navigated away from).
function SocialLinkGroup() {
  const labels = useLocaleContent('social')

  return (
    <div className="social-links">
      {CHANNELS.map(({ id, label, href }) => (
        <MicroInteraction
          key={id}
          as="a"
          className="social-links__trigger"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels[`${id}Label`] ?? label}
        >
          {label}
        </MicroInteraction>
      ))}
    </div>
  )
}

export default SocialLinkGroup
