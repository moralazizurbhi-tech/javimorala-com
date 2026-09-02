import { useState } from 'react'
import { MicroInteraction } from '../animation/microInteraction.jsx'
import { useLocaleContent } from '../locale/localeLayer.js'
import './EmailContactDevice.scss'

// Split so the full address never exists as one literal string anywhere in
// rendered content or source — only reconstructed in memory, and only when
// a visitor actually activates the trigger or fallback. Neither handler
// ever writes it into a DOM attribute or text node, so the guard holds in
// both the default and fallback-active states (Commitment 2). Placeholder
// pending Javi's real address, same deferral as other Tasks' placeholder
// content.
const ADDRESS_USER = 'javi'
const ADDRESS_DOMAIN = 'example.com'

function resolveAddress() {
  return `${ADDRESS_USER}@${ADDRESS_DOMAIN}`
}

// Sign-off text is the trigger's own children — one element, never rendered
// apart (Commitment 4). The fallback is a separate, persistently visible
// affordance (per Feature UX), not conditionally revealed.
function EmailContactDevice() {
  const { signOff, fallbackLabel, fallbackCopied } = useLocaleContent('contact')
  const [copied, setCopied] = useState(false)

  function handleActivate() {
    window.location.href = `mailto:${resolveAddress()}`
  }

  async function handleFallback() {
    try {
      await navigator.clipboard.writeText(resolveAddress())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable/denied — no further fallback is defined
      // by Feature UX; the primary trigger remains available regardless.
    }
  }

  return (
    <div className="email-contact">
      <MicroInteraction
        as="button"
        type="button"
        className="email-contact__trigger"
        onClick={handleActivate}
      >
        {signOff}
      </MicroInteraction>
      <MicroInteraction
        as="button"
        type="button"
        className="email-contact__fallback"
        onClick={handleFallback}
      >
        {copied ? fallbackCopied : fallbackLabel}
      </MicroInteraction>
    </div>
  )
}

export default EmailContactDevice
