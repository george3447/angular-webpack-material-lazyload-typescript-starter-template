import { module } from 'angular';

import childComponent from './child.component';

const child = module('child', [])
    .component('childComponent', childComponent)
    .name;

export default child;