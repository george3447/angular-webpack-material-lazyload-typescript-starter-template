import { StateService } from 'angular-ui-router';

function appRun($state: StateService) {
    $state.go("auth");
}

appRun.$inject = ['$state'];

export default appRun;