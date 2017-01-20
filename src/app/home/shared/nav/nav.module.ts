import { module } from 'angular';
import navComponent from './nav.component';

const nav = module('nav', [])
    .component('nav', navComponent)
    .name;

export default nav;