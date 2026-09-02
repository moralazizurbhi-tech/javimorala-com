import AboutSection from './AboutSection.jsx'
import HeroSection from './HeroSection.jsx'
import LanguageOverrideControl from './LanguageOverrideControl.jsx'

// Composes the three domain sections in fixed order (Introduction, Personal
// Narrative, Connection), per project-architecture.md's System Structure and
// Component Relationships. No client-side router — single continuous page.
// Contact slot stays empty: its content component is built and mounted here
// by its own implementation task.
function AppShell() {
  return (
    <div id="app-shell">
      <section id="hero" aria-label="Introduction">
        <HeroSection />
      </section>
      <section id="about" aria-label="Personal narrative">
        <AboutSection />
      </section>
      <section id="contact" aria-label="Connection" />
      <LanguageOverrideControl />
    </div>
  )
}

export default AppShell
