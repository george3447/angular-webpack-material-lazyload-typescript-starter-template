import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { loadLazyState, resolveLazyState } from './shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("auth", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule: any = require('./auth/auth.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "auth");
        })
    }).state("home", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule: any = require('./home/home.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "home");
        })
    });
}

configure.$inject = ['$stateProvider'];

export default configure;