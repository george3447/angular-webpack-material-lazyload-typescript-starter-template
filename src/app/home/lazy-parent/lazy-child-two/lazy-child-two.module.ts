import { module } from 'angular';

import lazyChildTwoComponent from './lazy-child-two.component';
import lazyChildConfig from './lazy-child-two.config';

const lazyChildTwo = module('lazy-child-two', [])
    .component('lazyChildTwoComponent', lazyChildTwoComponent)
    .config(lazyChildConfig)
    .name;

export default lazyChildTwo;