import { module } from 'angular';
import NavComponent from './nav.component';

const nav = module('nav', [])
    .component('nav', NavComponent)
    .name;

export default nav;