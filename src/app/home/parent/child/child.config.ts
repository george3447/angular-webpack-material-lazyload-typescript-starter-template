import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/side-menu/shared/side-menu.models';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("childComponent", <StateDeclaration>{
        parent: "parent",
        component: "childComponent",
        data: <IMenu>{
            isChild: true, 
            navTitle: "Child Component",
            moduleTitle: "Child Component",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;