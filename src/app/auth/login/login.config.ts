import { StateProvider, StateDeclaration } from 'angular-ui-router';

function configure($stateProvider: StateProvider) {
    $stateProvider.state("login", <StateDeclaration>{
        parent: "auth",
        component: "login"
    });
}

configure.$inject = ['$stateProvider'];

export default configure;