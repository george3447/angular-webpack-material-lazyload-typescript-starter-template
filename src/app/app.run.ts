import { StateService } from '@uirouter/angularjs';

function appRun($state: StateService) {
    $state.go("auth");
}

appRun.$inject = ['$state'];

export default appRun;