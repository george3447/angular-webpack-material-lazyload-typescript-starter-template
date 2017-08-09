import { StateProvider, StateDeclaration } from '@uirouter/angularjs';
import { loadLazyState } from '../shared/util.service';

function authConfigure($stateProvider: StateProvider) {

    $stateProvider
        .state("login", <StateDeclaration>{
            //lazyLoad: loadLazyState(() => import(/* webpackChunkName: "login" */ './login/login.module')),
            parent: "auth",
            component: "login",
            url:"/login"
        }).state("recover", <StateDeclaration>{
            lazyLoad: loadLazyState(() => import(/* webpackChunkName: "recover" */ './recover/recover.module')),
            parent: "auth",
            component: "recover",
            url:"/recover"
        });
}

authConfigure.$inject = ['$stateProvider'];

export default authConfigure;