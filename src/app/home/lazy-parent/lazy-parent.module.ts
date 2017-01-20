import { module } from 'angular';

import lazyParentComponent from './lazy-parent.component';
import lazyParentConfigure from './lazy-parent.config';

const Sample = module('lazy-parent', [])
    .component('lazyParentComponent', lazyParentComponent)
    .config(lazyParentConfigure)
    .name;

export default Sample;