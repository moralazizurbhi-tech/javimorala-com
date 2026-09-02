import { SectionEntry } from '../animation/sectionPageMotion.jsx'
import { useLocaleContent } from '../locale/localeLayer.js'
import './AboutSection.scss'

// Hook and bio are static children of one SectionEntry wrapper, in fixed
// hook-then-body order, with no conditional gating between them — so
// Commitment 1's inseparability/order and Commitment 5's no-gating both
// hold structurally, matching this Feature's Technical Design Decisions.
// Bio stays one undifferentiated block (no per-dimension sub-elements),
// satisfying Commitment 2 AC4's structural requirement.
function AboutSection() {
  const { hook, bio } = useLocaleContent('about')

  return (
    <SectionEntry as="div" className="about">
      <p className="about__hook">{hook}</p>
      <p className="about__bio">{bio}</p>
    </SectionEntry>
  )
}

export default AboutSection
