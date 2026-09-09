import { useEffect, useState } from 'react';
import { Dialog, VisuallyHidden } from 'radix-ui';
import LanguageSwitcher from '../language-override/LanguageSwitcher';
import styles from './SectionNav.module.scss';

// Section Navigation Composition — core desktop bar & active-section
// state (T-011), extended here with the mobile toggle/full-screen
// overlay and the language-control hosting slot in both nav forms
// (T-012, Commitments 6, 7). One shared component tree — Styling
// System breakpoints decide which of the two realizations is visible
// (technical-design.md, Design Decision 6) — not two separately
// maintained components; both consume the same active-section state
// (Design Decision 1) and the same link set.
//
// Static pre-hydration baseline (Design Decision 5): wordmark and
// "about"/"contact" links are plain in-page anchors, functional via
// native browser anchor navigation (Commitments 2, 3) with no JS
// required. The compact logomark defaults to omitted, matching
// Commitment 5 AC1 ("Introduction active on initial load"). Hydration
// then takes over only to keep the active-section state (Commitment 5)
// and the derived compact-logomark condition (Commitment 4) accurate at
// runtime — the only behavior that needs a live scroll observation. The
// mobile toggle/overlay (Commitment 6) is necessarily hydration-only —
// it has no meaningful static/no-JS form of its own.
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
//
// The mobile overlay is built on the Accessible Primitives Layer
// (Radix UI's Dialog), per the Technical Design's own Constraint —
// its modal focus-trap and full-screen backdrop are what satisfy
// Commitment 6 AC4 ("underlying page not interactable while open")
// without this component reimplementing focus management itself. Each
// overlay link is wrapped in Dialog.Close (asChild) so activating it
// both closes the overlay and lets the anchor's own default navigation
// proceed in the same interaction (Commitment 6, AC2); the separate
// close control only closes, with no href and no navigation side effect
// (Commitment 6, AC3).

export type SectionId = 'introduction' | 'personal-narrative' | 'connection';

const SECTION_IDS: readonly SectionId[] = ['introduction', 'personal-narrative', 'connection'];

interface Props {
	wordmark: string;
	navLabelAbout: string;
	navLabelContact: string;
}

export default function SectionNav({ wordmark, navLabelAbout, navLabelContact }: Props) {
	const [activeSection, setActiveSection] = useState<SectionId>('introduction');
	const [overlayOpen, setOverlayOpen] = useState(false);

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
		<>
			<nav className={styles.nav} aria-label="Primary">
				<a href="#introduction" className={styles.wordmark}>
					{wordmark}
				</a>
				{!isIntroduction && (
					<a href="#introduction" className={styles.compactMark} aria-label="Introduction" />
				)}
				<div className={styles.navEnd}>
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
					<div className={styles.languageSlot}>
						<LanguageSwitcher />
					</div>
				</div>
			</nav>

			<Dialog.Root open={overlayOpen} onOpenChange={setOverlayOpen}>
				<div className={styles.mobileBar}>
					<a href="#introduction" className={styles.mobileWordmark}>
						{wordmark}
					</a>
					<Dialog.Trigger className={styles.toggle} aria-label="Open menu">
						<svg viewBox="0 0 32 8" aria-hidden="true" focusable="false">
							<line x1="0" y1="1" x2="32" y2="1" stroke="currentColor" strokeWidth="2" />
							<line x1="0" y1="7" x2="32" y2="7" stroke="currentColor" strokeWidth="2" />
						</svg>
					</Dialog.Trigger>
				</div>
				<Dialog.Portal>
					<Dialog.Overlay className={styles.overlayBackdrop} />
					<Dialog.Content className={styles.overlayContent}>
						<VisuallyHidden.Root asChild>
							<Dialog.Title>Navigation menu</Dialog.Title>
						</VisuallyHidden.Root>
						<Dialog.Close className={styles.closeButton} aria-label="Close menu">
							<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
								<path
									d="M4 4l16 16M20 4 4 20"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</Dialog.Close>
						<ul className={styles.overlayLinks}>
							<li>
								<Dialog.Close asChild>
									<a
										href="#personal-narrative"
										className={
											activeSection === 'personal-narrative'
												? `${styles.overlayLink} ${styles.linkActive}`
												: styles.overlayLink
										}
									>
										{navLabelAbout}
									</a>
								</Dialog.Close>
							</li>
							<li>
								<Dialog.Close asChild>
									<a
										href="#connection"
										className={
											activeSection === 'connection' ? `${styles.overlayLink} ${styles.linkActive}` : styles.overlayLink
										}
									>
										{navLabelContact}
									</a>
								</Dialog.Close>
							</li>
						</ul>
						<div className={styles.overlayLanguageSlot}>
							<LanguageSwitcher />
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
