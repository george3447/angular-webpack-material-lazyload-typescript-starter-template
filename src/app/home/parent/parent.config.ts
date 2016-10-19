import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("childComponent", <StateDeclaration>{
        parent: "parent",
        component: "childComponent",
        data: <IMenu>{
            isChild: true, 
            navTitle: "Child",
            moduleTitle: "Child",
            isMenuItem: true
        }
    }).state("childOneComponent", <StateDeclaration>{
        parent: "parent",
        component: "childOneComponent",
        data: <IMenu>{
            isChild: true, 
            navTitle: "Child One",
            moduleTitle: "Child One",
            isMenuItem: true
        }
    }).state("childTwoComponent", <StateDeclaration>{
        parent: "parent",
        component: "childTwoComponent",
        data: <IMenu>{
            isChild: true, 
            navTitle: "Child Two",
            moduleTitle: "Child Two",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;