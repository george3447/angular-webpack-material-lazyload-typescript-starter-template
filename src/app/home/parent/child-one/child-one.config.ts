import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/util.service';

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