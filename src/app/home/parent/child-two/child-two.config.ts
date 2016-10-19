import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/util.service';

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