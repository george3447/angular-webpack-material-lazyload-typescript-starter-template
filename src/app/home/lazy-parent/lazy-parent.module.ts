import { module } from 'angular';

import lazyParentConfigure from './lazy-parent.config';

const Sample = module('lazy-parent', [])
    .config(lazyParentConfigure)
    .name;

export default Sample;