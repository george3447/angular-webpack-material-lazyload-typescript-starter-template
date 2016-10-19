import { module } from 'angular';

import lazyChildComponent from './lazy-child.component';
import lazyChildConfig from './lazy-child.config';

const lazyChild = module('lazy-child', [])
    .component('lazyChildComponent', lazyChildComponent)
    .config(lazyChildConfig)
    .name;

export default lazyChild;