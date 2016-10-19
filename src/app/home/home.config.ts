import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from './shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("home", <StateDeclaration>{
        component: "homeComponent",
        redirectTo: "childComponent"
    }).state("parent", <StateDeclaration>{
        redirectTo: "child",
        parent: 'home',
        abstract: true,
        template: '<ui-view layout="column" flex></ui-view>',
        data: <IMenu>{ isMenuItem: true, navTitle: "parent" }
    }).state("lazyParent", <StateDeclaration>{
        parent: 'home',
        abstract: true,
        template: '<ui-view layout="column" flex></ui-view>',
        data: <IMenu>{ isMenuItem: true, navTitle: "lazy-parent" }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;