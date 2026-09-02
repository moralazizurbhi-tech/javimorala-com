import { SectionEntry } from '../animation/sectionPageMotion.jsx'
import { useLocaleContent } from '../locale/localeLayer.js'
import './HeroSection.scss'

// Headline/tagline, wordmark, and scroll cue are children of one SectionEntry
// wrapper — never independently rendered/gated — so composition completeness
// (Contract Commitment 1) holds structurally, matching this Feature's
// Technical Design Decision to not track completeness as separate state.
function HeroSection() {
  const { headline, tagline } = useLocaleContent('hero')

  return (
    <SectionEntry as="div" className="hero">
      <div className="hero__wordmark" aria-hidden="true">
        JM
      </div>
      <div className="hero__text">
        <h1 className="hero__headline">{headline}</h1>
        <p className="hero__tagline">{tagline}</p>
      </div>
      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="hero__scroll-cue-icon">↓</span>
      </div>
    </SectionEntry>
  )
}

export default HeroSection
