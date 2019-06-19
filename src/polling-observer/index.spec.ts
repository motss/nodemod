import { performance } from 'perf_hooks';

global.performance = performance;

import './test/error.spec.js';
import './test/global-perfomance.spec.js';
import './test/polling-measure.spec.js';
import './test/polling-observer.spec.js';
