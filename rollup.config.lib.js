// @ts-check

import { readdirSync } from 'fs';

import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

function pluginFn() {
  return [
    nodeResolve(),
    commonjs(),
    typescript({
      include: ['src/lib/*.ts'],
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    terser({
      compress: true,
      mangle: {
        properties: { regex: /^_/ },
        reserved: [],
        safari10: true,
        toplevel: true,
      },
      output: { safari10: true },
      safari10: true,
      toplevel: true,
    }),
  ];
};

const src = './src/lib';
const allLibs = readdirSync(src).filter(n => /\.ts$/i.test(n));

const multiBuild = allLibs.reduce((p, n) => {
  const cjs = {
    input: `${src}/${n}`,
    output: {
      file: `dist/lib/${n.replace(/ts$/i, 'cjs')}`,
      format: 'cjs',
      exports: 'named',
    },
    experimentalOptimizeChunks: true,
    plugins: pluginFn(),
    treeshake: { moduleSifeEffects: false },
  };
  const esm = {
    ...cjs,
    output: {
      ...cjs.output,
      file: `dist/lib/${n.replace(/ts$/i, 'js')}`,
      format: 'esm',
    },
  };

  p.push(cjs, esm);

  return p;
}, []);

export default multiBuild;
