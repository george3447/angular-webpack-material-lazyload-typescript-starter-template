import { module } from 'angular';
import recoverComponent from './recover.component';
//import recoverConfig from './recover.config';

const recover = module('recover', [])
    .component('recover', recoverComponent)
    //.config(recoverConfig)
    .name;

export default recover;