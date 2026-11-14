// T-B · Aviso en HTML. Comprobación de Bloom: un único <p class="aviso"> con el texto de aviso.json.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const leer = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');
const decodificar = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

test('aviso.html tiene un único <p class="aviso"> con el texto de aviso.json', () => {
  const aviso = JSON.parse(leer('./aviso.json')).aviso;
  assert.ok(typeof aviso === 'string' && aviso.trim(), 'aviso.json no tiene texto');
  const parrafos = [...leer('./aviso.html').matchAll(/<p\s+class="aviso"\s*>([\s\S]*?)<\/p>/g)];
  assert.equal(parrafos.length, 1, 'debe haber exactamente un <p class="aviso">');
  assert.equal(decodificar(parrafos[0][1]).trim(), aviso.trim());
});
