// @ts-check
import { defineConfig } from 'astro/config';

// Config de build para el VPS de pruebas (dominio raíz, sin base /ClinicaNU)
export default defineConfig({
  outDir: 'dist-vps',
  site: 'https://prueba.clinicanuriaugarte.es',
  base: '/'
});
