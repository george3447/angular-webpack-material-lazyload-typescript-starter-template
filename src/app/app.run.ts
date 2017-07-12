import { StateService } from '@uirouter/angularjs';
import SWService from './shared/sw.service';

function appRun($state: StateService, SWService: SWService) {
    $state.go("auth");
    SWService.init();
}

appRun.$inject = ['$state', 'SWService'];

export default appRun;