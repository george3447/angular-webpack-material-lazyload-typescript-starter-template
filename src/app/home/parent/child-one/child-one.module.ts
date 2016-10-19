import { module } from 'angular';

import childOneComponent from './child-one.component';

const childOne = module('child-one', [])
    .component('childOneComponent', childOneComponent)
    .name;

export default childOne;