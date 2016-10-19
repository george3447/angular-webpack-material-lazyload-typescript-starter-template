import { StateProvider, StateDeclaration } from 'angular-ui-router';
import { loadLazyState, resolveLazyState } from '../shared/util.service';

function authConfigure($stateProvider: StateProvider) {
    $stateProvider.state("auth", <StateDeclaration>{
        component: "authComponent",
        redirectTo: 'login'
    }).state("login", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule: any = require('./login/login.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "login");
        })
    }).state("recover", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule = require('./recover/recover.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "recover");
        })
    });


}

authConfigure.$inject = ['$stateProvider'];

export default authConfigure;