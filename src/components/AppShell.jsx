import LanguageOverrideControl from './LanguageOverrideControl.jsx'

// Composes the three domain sections in fixed order (Introduction, Personal
// Narrative, Connection), per project-architecture.md's System Structure and
// Component Relationships. No client-side router — single continuous page.
// Slots are intentionally empty: Hero/About/Contact content components are
// built and mounted here by their own implementation tasks.
function AppShell() {
  return (
    <div id="app-shell">
      <section id="hero" aria-label="Introduction" />
      <section id="about" aria-label="Personal narrative" />
      <section id="contact" aria-label="Connection" />
      <LanguageOverrideControl />
    </div>
  )
}

export default AppShell
