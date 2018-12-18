import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'bundle',
      file: 'dist/coriander.js',
      format: 'umd'
    },
    plugins: [resolve(), commonjs()]
  },
  {
    input: 'src/main.js',
    output: {
      name: 'bundle',
      file: pkg.main,
      format: 'umd'
    },
    plugins: [resolve(), commonjs(), uglify()]
  }
];
