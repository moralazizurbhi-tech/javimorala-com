import { describe, expect, it } from 'vitest';
import { encodeCharacterReferences } from './encodeCharacterReferences';

describe('encodeCharacterReferences (direct-contact/contract.md Commitment 2)', () => {
	it('encodes every character as a numeric HTML character reference', () => {
		expect(encodeCharacterReferences('ab')).toBe('&#97;&#98;');
	});

	it('never leaves the original literal substring present in the output', () => {
		const input = 'mailto:javimorala@outlook.com';
		const encoded = encodeCharacterReferences(input);

		expect(encoded).not.toContain('mailto:');
		expect(encoded).not.toContain('javimorala@outlook.com');
		expect(encoded).not.toContain('@');
	});

	it('round-trips back to the original string when HTML-decoded', () => {
		const input = 'mailto:javimorala@outlook.com';
		const encoded = encodeCharacterReferences(input);

		// Simulates the browser's own HTML parser decoding numeric
		// character references — no library, since the mechanism itself
		// must require none (Technical Design Constraints).
		const decoded = encoded.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

		expect(decoded).toBe(input);
	});
});
