import { module } from 'angular';

import lazyParentComponent from './lazy-parent.component';
import lazyParentRouting from './lazy-parent.routing';

const Sample = module('lazy-parent', [])
    .component('lazyParentComponent', lazyParentComponent)
    .config(lazyParentRouting)
    .name;

export default Sample;