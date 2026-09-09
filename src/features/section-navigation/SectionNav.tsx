import { useEffect, useState } from 'react';
import styles from './SectionNav.module.scss';

// Section Navigation Composition — core desktop bar & active-section
// state (T-011). Mobile toggle/overlay and the language-control hosting
// slot are T-012's own responsibility (technical-design.md, Design
// Decision 6 — one shared component tree, extended there).
//
// Static pre-hydration baseline (Design Decision 5): wordmark and
// "about"/"contact" links are plain in-page anchors, functional via
// native browser anchor navigation (Commitments 2, 3) with no JS
// required. The compact logomark defaults to omitted, matching
// Commitment 5 AC1 ("Introduction active on initial load"). Hydration
// then takes over only to keep the active-section state (Commitment 5)
// and the derived compact-logomark condition (Commitment 4) accurate at
// runtime — the only behavior that needs a live scroll observation.
//
// The wordmark is always rendered and always links to Introduction's
// top, on every screen (ui.md: "consistent across all three screens'
// nav"); the compact logomark icon is `section-navigation`'s own
// "Logomark Home-Link" realization (ux.md), also linking to
// Introduction's top, but conditionally present only outside
// Introduction (Commitment 4). Together they guarantee Commitment 3
// holds on every screen, including while still on Introduction
// (Commitment 3's own "partway scrolled through Introduction" scenario)
// — an Implementation Detail resolving the mechanism, not a new
// decision: the always-present wordmark is the vehicle whenever the
// icon itself is hidden.

export type SectionId = 'introduction' | 'personal-narrative' | 'connection';

const SECTION_IDS: readonly SectionId[] = ['introduction', 'personal-narrative', 'connection'];

interface Props {
	wordmark: string;
	navLabelAbout: string;
	navLabelContact: string;
}

export default function SectionNav({ wordmark, navLabelAbout, navLabelContact }: Props) {
	const [activeSection, setActiveSection] = useState<SectionId>('introduction');

	useEffect(() => {
		const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
			(el): el is HTMLElement => el !== null,
		);
		if (elements.length === 0) return;

		// A section is a candidate while any part of it sits within a band
		// just below the fixed nav. Multiple sections can be simultaneously
		// within that band at once (e.g. a short section next to a much
		// taller one) — tracked here as a running set, not just the latest
		// callback batch, since IntersectionObserver only reports entries
		// whose state changed, not the full current set every time. Among
		// current candidates, the earliest (topmost, in document order) one
		// wins. This is what makes Commitment 5 AC1 ("Introduction active on
		// initial load") hold structurally rather than incidentally: at
		// scroll position 0, Introduction is always among the candidates —
		// it's the very first section — so it always wins the tie,
		// regardless of how tall it or its neighbour are. A viewport-centre
		// or bare "last entry wins" approach can instead hand the win to a
		// short Introduction's much taller neighbour. Otherwise keeps
		// exactly one section active at a time (AC4), updates on free
		// scroll (AC3), and settles on the target section once a nav-link
		// jump lands (AC2).
		const withinBand = new Set<SectionId>(['introduction']);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const id = entry.target.id as SectionId;
					if (entry.isIntersecting) {
						withinBand.add(id);
					} else {
						withinBand.delete(id);
					}
				}
				setActiveSection(SECTION_IDS.find((id) => withinBand.has(id)) ?? 'introduction');
			},
			{ rootMargin: '0px 0px -80% 0px', threshold: 0 },
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);

	const isIntroduction = activeSection === 'introduction';

	return (
		<nav className={styles.nav} aria-label="Primary">
			<a href="#introduction" className={styles.wordmark}>
				{wordmark}
			</a>
			{!isIntroduction && (
				<a href="#introduction" className={styles.compactMark} aria-label="Introduction" />
			)}
			<ul className={styles.links}>
				<li>
					<a
						href="#personal-narrative"
						className={activeSection === 'personal-narrative' ? `${styles.link} ${styles.linkActive}` : styles.link}
					>
						{navLabelAbout}
					</a>
				</li>
				<li>
					<a
						href="#connection"
						className={activeSection === 'connection' ? `${styles.link} ${styles.linkActive}` : styles.link}
					>
						{navLabelContact}
					</a>
				</li>
			</ul>
		</nav>
	);
}
