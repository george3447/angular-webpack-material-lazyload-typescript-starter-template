import { module } from 'angular';
import AuthService from './shared/auth.service';
import AuthComponent from './auth.component';
import authConfigure from './auth.config';
import authRun from './auth.run';

const Auth = module('app.auth', [])
    .service('AuthService', AuthService)
    .component('authComponent', AuthComponent)
    .config(authConfigure)
    .run(authRun)
    .name;

export default Auth;