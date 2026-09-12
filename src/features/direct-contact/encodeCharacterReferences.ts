// Anti-Scraping Encoding Mechanism (T-015) — direct-contact/technical-design.md.
// Converts a string into HTML numeric character references (`&#<code>;`
// per character) so the CTA's `mailto:` href never appears as literal,
// directly-crawlable text in the delivered static HTML (Contract
// Commitment 2, AC1/AC2). Every browser's standard HTML parser decodes
// these back to the real characters with no script required — this is
// baseline HTML parsing, not a runtime mechanism — so the rendered DOM
// (and what assistive technology reads) is unaffected; only the raw
// pre-render source is obscured.
export function encodeCharacterReferences(value: string): string {
	return Array.from(value)
		.map((char) => `&#${char.codePointAt(0)};`)
		.join('');
}
