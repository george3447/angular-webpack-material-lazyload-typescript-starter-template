import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { loadLazyState, resolveLazyState } from '../../shared/util.service';
import { IMenu } from '../shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("lazyChild", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule: any = require('./lazy-child/lazy-child.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "lazyChild");
        }),
        data: <IMenu>{
            parent: "lazyParent",
            isChild: true,
            navTitle: "Lazy Child",
            moduleTitle: "Lazy Child",
            isMenuItem: true
        }
    }).state("lazyChildOne", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule: any = require('./lazy-child-one/lazy-child-one.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "lazyChildOne");
        }),
        data: <IMenu>{
            parent: "lazyParent",
            isChild: true,
            navTitle: "Lazy Child One",
            moduleTitle: "Lazy Child One",
            isMenuItem: true
        }
    }).state("lazyChildTwo", <StateDeclaration>{
        lazyLoad: loadLazyState(function (resolve, $ocLazyLoad) {
            require.ensure([], function () {
                let lazyModule: any = require('./lazy-child-two/lazy-child-two.module');
                resolveLazyState(lazyModule, resolve, $ocLazyLoad);
            }, "lazyChildTwo");
        }),
        data: <IMenu>{
            parent: "lazyParent",
            isChild: true,
            navTitle: "Lazy Child Two",
            moduleTitle: "Lazy Child Two",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;