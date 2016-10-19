import { StateProvider, StateDeclaration } from 'angular-ui-router';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("recover", <StateDeclaration>{
        parent: "auth",
        component: "recover"
    });
}

configure.$inject = ['$stateProvider'];

export default configure;