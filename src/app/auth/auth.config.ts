import { StateProvider, StateDeclaration } from 'angular-ui-router';
import { loadLazyState, resolveLazyState } from '../shared/util.service';

function authConfigure($stateProvider: StateProvider) {
    $stateProvider
        //.state("auth", <StateDeclaration>{
        //    component: "authComponent",
        //    redirectTo: 'login'
        //.})
        .state("login", <StateDeclaration>{
            lazyLoad: loadLazyState(function (resolve, $ocLazyLoad, loaderService) {
                require.ensure([], function () {
                    let lazyModule: any = require('./login/login.module');
                    resolveLazyState(lazyModule, resolve, $ocLazyLoad, loaderService);
                }, "login");
            }),
            parent: "auth",
            component: "login"
        }).state("recover", <StateDeclaration>{
            lazyLoad: loadLazyState(function (resolve, $ocLazyLoad, loaderService) {
                require.ensure([], function () {
                    let lazyModule = require('./recover/recover.module');
                    resolveLazyState(lazyModule, resolve, $ocLazyLoad, loaderService);
                }, "recover");
            }),
            parent: "auth",
            component: "recover"
        });


}

authConfigure.$inject = ['$stateProvider'];

export default authConfigure;