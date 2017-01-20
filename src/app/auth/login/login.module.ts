import { module } from 'angular';
import loginComponent from './login.component';
//import loginConfig from './login.config';

export const login = module('login', [])
    .component('login', loginComponent)
    //.config(loginConfig)
    .name;
    
export default login;