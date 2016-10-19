import { module } from 'angular';

import lazyChildOneComponent from './lazy-child-one.component';
import lazyChildConfig from './lazy-child-one.config';

const lazyChildOne = module('lazy-child-one', [])
    .component('lazyChildOneComponent', lazyChildOneComponent)
    .config(lazyChildConfig)
    .name;

export default lazyChildOne;