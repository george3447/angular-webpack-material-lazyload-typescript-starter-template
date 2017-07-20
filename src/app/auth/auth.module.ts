import { module } from 'angular';
import AuthService from './shared/auth.service';
import authComponent from './auth.component';
import authConfigure from './auth.config';
import Login from './login/login.module';
//import authRun from './auth.run';

const Auth = module('app.auth', [Login])
    .service('AuthService', AuthService)
    .component('authComponent', authComponent)
    .config(authConfigure)
    //.run(authRun)
    .name;

export default Auth;