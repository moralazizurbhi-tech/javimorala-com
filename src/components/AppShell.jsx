import AboutSection from './AboutSection.jsx'
import EmailContactDevice from './EmailContactDevice.jsx'
import HeroSection from './HeroSection.jsx'
import LanguageOverrideControl from './LanguageOverrideControl.jsx'
import SocialLinkGroup from './SocialLinkGroup.jsx'

// Composes the three domain sections in fixed order (Introduction, Personal
// Narrative, Connection), per project-architecture.md's System Structure and
// Component Relationships. No client-side router — single continuous page.
// Social Link Group (built standalone at T-022) is instantiated twice here,
// alongside Hero Section and Email Contact Device, per social-links'
// Technical Design — same component definition both times, no
// per-instantiation variation (Contract Commitment 2).
function AppShell() {
  return (
    <div id="app-shell">
      <section id="hero" aria-label="Introduction">
        <HeroSection />
        <SocialLinkGroup />
      </section>
      <section id="about" aria-label="Personal narrative">
        <AboutSection />
      </section>
      <section id="contact" aria-label="Connection">
        <EmailContactDevice />
        <SocialLinkGroup />
      </section>
      <LanguageOverrideControl />
    </div>
  )
}

export default AppShell
