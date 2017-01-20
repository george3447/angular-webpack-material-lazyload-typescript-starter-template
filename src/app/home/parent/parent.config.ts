import { StateProvider, StateDeclaration } from 'angular-ui-router';

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