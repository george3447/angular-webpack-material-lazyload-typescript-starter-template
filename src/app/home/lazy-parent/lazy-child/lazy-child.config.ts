import { StateProvider, StateDeclaration } from 'angular-ui-router';

import { IMenu } from '../../shared/util.service';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("lazyChild", <StateDeclaration>{
        parent: "lazyParent",
        component: "lazyChildComponent",
        data: <IMenu>{
            isChild: true,
            navTitle: "Lazy Child",
            moduleTitle: "Lazy Child",
            isMenuItem: true
        }
    });
}

configure.$inject = ['$stateProvider'];

export default configure;