import { module } from 'angular';

import lazyChildOneComponent from './lazy-child-one.component';

const lazyChildOne = module('lazy-child-one', [])
    .component('lazyChildOneComponent', lazyChildOneComponent)
    .name;

export default lazyChildOne;