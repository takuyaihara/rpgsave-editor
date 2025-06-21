import esbuild from 'esbuild';
import { resolve } from 'node:path';

esbuild.build({
  entryPoints: [resolve('electron/preload.ts')],
  outfile: resolve('dist/preload.js'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  external: ['electron'],
}).catch(() => process.exit(1));