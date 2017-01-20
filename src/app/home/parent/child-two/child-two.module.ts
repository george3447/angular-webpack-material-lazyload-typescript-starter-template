import { module } from 'angular';

import childTwoComponent from './child-two.component';
import childtwoConfigure from './child-two.config';

const childTwo = module('child-two', [])
    .component('childTwoComponent', childTwoComponent)
    .config(childtwoConfigure)
    .name;

export default childTwo;