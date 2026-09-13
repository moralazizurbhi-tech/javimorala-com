// Presence Link Group Composition (T-017) — presence-links/technical-design.md,
// Owned Concepts: "the static, locale-independent profile link data
// (platform label + destination URL pairs, in their confirmed order) —
// defined once, consumed by both instantiations." This is that single
// shared definition (Commitment 2) — both future host placements (T-018)
// import this same array rather than authoring their own list.
//
// Labels are confirmed language-independent (ux.md, Content and Assets),
// so no locale key applies here (Commitment 3, satisfied by construction —
// technical-design.md's own Contract Traceability).
//
// URLs are Confirmed (developer-supplied, post-implementation correction)
// — the ux.md placeholder ("to be replaced by the user before launch")
// is resolved.
export interface PresenceLink {
	label: string;
	href: string;
}

export const PRESENCE_LINKS: readonly PresenceLink[] = [
	{ label: 'Instagram', href: 'https://www.instagram.com/javimorala' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/javier-morala-martínez-6b8b14181' },
];
