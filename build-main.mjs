import esbuild from 'esbuild';
import { resolve } from 'node:path';

esbuild.build({
  entryPoints: [resolve('electron/main.ts')],
  outfile: resolve('dist/main.js'),
  bundle: true,
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  external: ['electron'],
}).catch(() => process.exit(1));