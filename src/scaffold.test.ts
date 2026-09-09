import { describe, expect, it } from 'vitest';

// Scaffold-only smoke test (T-001) proving Vitest is wired in.
// Superseded by real logic-bearing tests once such logic exists (e.g. T-005).
describe('scaffold', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
