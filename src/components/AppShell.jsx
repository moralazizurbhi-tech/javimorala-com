import AboutSection from './AboutSection.jsx'
import EmailContactDevice from './EmailContactDevice.jsx'
import HeroSection from './HeroSection.jsx'
import LanguageOverrideControl from './LanguageOverrideControl.jsx'

// Composes the three domain sections in fixed order (Introduction, Personal
// Narrative, Connection), per project-architecture.md's System Structure and
// Component Relationships. No client-side router — single continuous page.
// Contact slot still awaits its social-links-owned element (Social Link
// Group, built standalone at T-022, mounted here at T-030).
function AppShell() {
  return (
    <div id="app-shell">
      <section id="hero" aria-label="Introduction">
        <HeroSection />
      </section>
      <section id="about" aria-label="Personal narrative">
        <AboutSection />
      </section>
      <section id="contact" aria-label="Connection">
        <EmailContactDevice />
      </section>
      <LanguageOverrideControl />
    </div>
  )
}

export default AppShell
