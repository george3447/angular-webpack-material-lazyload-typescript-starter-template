import { module } from 'angular';

import childComponent from './child.component';
//import childConfigure from './child.config';

const child = module('child', [])
    .component('childComponent', childComponent)
    //.config(childConfigure)
    .name;

export default child;