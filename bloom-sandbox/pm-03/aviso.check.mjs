// T-A · Aviso en JSON. Comprobación de Bloom: el JSON es válido y `aviso` tiene texto.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('aviso.json es un objeto válido con el texto del aviso', () => {
  const datos = JSON.parse(readFileSync(new URL('./aviso.json', import.meta.url), 'utf8'));
  assert.equal(typeof datos.aviso, 'string', 'falta la clave `aviso` o no es texto');
  assert.ok(datos.aviso.trim().length > 0, '`aviso` está vacío');
});
