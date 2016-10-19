import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("lazyChildOne", <StateDeclaration>{
        parent: "lazyParent",
        component: "lazyChildOneComponent",
        data: <IMenu>{
            isChild: true, 
            navTitle: "Lazy Child One",
            moduleTitle: "Lazy Child One",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;