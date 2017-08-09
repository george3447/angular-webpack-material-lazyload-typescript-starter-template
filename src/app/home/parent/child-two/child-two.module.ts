import { module } from 'angular';

import childTwoComponent from './child-two.component';

const childTwo = module('child-two', [])
    .component('childTwoComponent', childTwoComponent)
    .name;

export default childTwo;