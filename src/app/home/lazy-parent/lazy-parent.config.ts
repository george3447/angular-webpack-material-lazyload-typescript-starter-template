import { StateProvider, StateDeclaration } from '@uirouter/angularjs';

import { loadLazyState } from '../../shared/util.service';
import { IMenu } from '../shared/side-menu/shared/side-menu.models';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("lazyParent", <StateDeclaration>{
        parent: 'home',
        abstract: true,
        component: 'lazyParentComponent',
        data: <IMenu>{ isMenuItem: true, navTitle: "lazy-parent" }
    }).state("lazyChild", <StateDeclaration>{
        lazyLoad: loadLazyState(() => import(/* webpackChunkName: "lazy-child" */ './lazy-child/lazy-child.module')),
        component: "lazyChildComponent",
        parent: "lazyParent",
        data: <IMenu>{
            isChild: true,
            navTitle: "Lazy Child",
            moduleTitle: "Lazy Child",
            isMenuItem: true
        }
    }).state("lazyChildOne", <StateDeclaration>{
        lazyLoad: loadLazyState(() => import(/* webpackChunkName: "lazy-child-one" */ './lazy-child-one/lazy-child-one.module')),
        component: "lazyChildOneComponent",
        parent: "lazyParent",
        data: <IMenu>{
            isChild: true,
            navTitle: "Lazy Child One",
            moduleTitle: "Lazy Child One",
            isMenuItem: true
        }
    }).state("lazyChildTwo", <StateDeclaration>{
        lazyLoad: loadLazyState(() => import(/* webpackChunkName: "lazy-child-two" */ './lazy-child-two/lazy-child-two.module')),
        component: "lazyChildTwoComponent",
        parent: "lazyParent",
        data: <IMenu>{
            isChild: true,
            navTitle: "Lazy Child Two",
            moduleTitle: "Lazy Child Two",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;