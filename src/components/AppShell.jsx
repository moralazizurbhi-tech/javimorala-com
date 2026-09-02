import AboutSection from './AboutSection.jsx'
import EmailContactDevice from './EmailContactDevice.jsx'
import HeroSection from './HeroSection.jsx'
import LanguageOverrideControl from './LanguageOverrideControl.jsx'
import SectionNav from './SectionNav.jsx'
import SocialLinkGroup from './SocialLinkGroup.jsx'

// Composes the three domain sections in fixed order (Introduction, Personal
// Narrative, Connection), per project-architecture.md's System Structure and
// Component Relationships. No client-side router — single continuous page.
// Contact slot still awaits its social-links-owned element (Social Link
// Group, built standalone at T-022, mounted here at T-030).
// Section Nav (built standalone at T-024/T-025) mounts as an App-Shell-level
// sibling to the sections, not nested inside any one of them — it targets
// all three via their fixed ids and is itself `position: fixed`, so it must
// stay reachable regardless of which section is in view (section-navigation's
// Technical Design: composed alongside Hero/About/Contact, not by one of them).
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
      <SectionNav />
      <LanguageOverrideControl />
    </div>
  )
}

export default AppShell
