import { StateProvider, StateDeclaration } from '@uirouter/angularjs';

import { IMenu } from '../../shared/side-menu/shared/side-menu.models';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("childOneComponent", <StateDeclaration>{
        parent: "parent",
        component: "childOneComponent",
        data: <IMenu>{
            isChild: true,
            navTitle: "Child One Component",
            moduleTitle: "Child One Component",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;