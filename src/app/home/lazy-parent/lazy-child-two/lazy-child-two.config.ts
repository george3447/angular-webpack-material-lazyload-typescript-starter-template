import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("lazyChildTwo", <StateDeclaration>{
        parent: "lazyParent",
        component: "lazyChildTwoComponent",
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