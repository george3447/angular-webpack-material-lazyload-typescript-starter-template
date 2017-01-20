import { module } from 'angular';

import lazyChildTwoComponent from './lazy-child-two.component';

const lazyChildTwo = module('lazy-child-two', [])
    .component('lazyChildTwoComponent', lazyChildTwoComponent)
    .name;

export default lazyChildTwo;