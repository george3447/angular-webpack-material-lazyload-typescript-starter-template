import { module } from 'angular';

import lazyChildComponent from './lazy-child.component';

const lazyChild = module('lazy-child', [])
    .component('lazyChildComponent', lazyChildComponent)
    .name;

export default lazyChild;