import { ICompileProvider } from 'angular';
import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

import { loadLazyState } from './shared/util.service';

function configure($compileProvider: ICompileProvider, $stateProvider: StateProvider) {

    let isProductionBuild: boolean = __ENV !== "build";

    $compileProvider.debugInfoEnabled(!isProductionBuild);

    $stateProvider.state("auth", <Ng1StateDeclaration>{
        lazyLoad: loadLazyState(() => import(/* webpackChunkName: "auth" */ './auth/auth.module')),
        component: "authComponent",
        redirectTo: 'login'
    }).state("home", <Ng1StateDeclaration>{
        lazyLoad: loadLazyState(() => import(/* webpackChunkName: "home" */ './home/home.module')),
        component: "homeComponent",
        redirectTo: "childComponent"
    });
}

configure.$inject = ['$compileProvider', '$stateProvider'];

export default configure;