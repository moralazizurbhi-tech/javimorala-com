// T-C · Estilos. Comprobación de Bloom: la regla `.aviso` con exactamente las tres declaraciones pedidas.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('estilos.css tiene la regla .aviso con color, margen inferior y tamaño de letra', () => {
  const css = readFileSync(new URL('./estilos.css', import.meta.url), 'utf8');
  const reglas = [...css.matchAll(/\.aviso\s*\{([^}]*)\}/g)];
  assert.equal(reglas.length, 1, 'debe haber exactamente una regla .aviso');
  const declaraciones = Object.fromEntries(reglas[0][1].split(';').map((d) => d.trim()).filter(Boolean).map((d) => {
    const i = d.indexOf(':');
    return [d.slice(0, i).trim().toLowerCase(), d.slice(i + 1).trim().toLowerCase()];
  }));
  assert.deepEqual(declaraciones, { color: '#7a1f1f', 'margin-bottom': '16px', 'font-size': '18px' });
});
