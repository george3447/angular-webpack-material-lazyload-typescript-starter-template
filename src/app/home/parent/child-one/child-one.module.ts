import { module } from 'angular';

import childOneComponent from './child-one.component';
import childOneConfigure from './child-one.config';

const childOne = module('child-one', [])
    .component('childOneComponent', childOneComponent)
    .config(childOneConfigure)
    .name;

export default childOne;