import { StateProvider, StateDeclaration } from '@uirouter/angularjs';

import { IMenu } from '../shared/side-menu/shared/side-menu.models';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("parent", <StateDeclaration>{
        parent: 'home',
        abstract: true,
        component: 'parentComponent',
        data: <IMenu>{ isMenuItem: true, navTitle: "parent" }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;