// @ts-check

import { allLibs, cjsBuild } from './rollup.config.lib.js';

const testBuild = allLibs.map(n => cjsBuild(n));

export default testBuild;

