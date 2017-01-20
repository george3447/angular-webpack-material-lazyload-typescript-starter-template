import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/side-menu/shared/side-menu.models';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("childTwoComponent", <StateDeclaration>{
        parent: "parent",
        component: "childTwoComponent",
        data: <IMenu>{
            isChild: true,
            navTitle: "Child Two Component",
            moduleTitle: "Child Two Component",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;