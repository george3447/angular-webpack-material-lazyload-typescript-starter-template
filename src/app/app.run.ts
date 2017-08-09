//import { StateService } from '@uirouter/angularjs';
import SWService from './shared/sw.service';

function appRun(SWService: SWService) {
    //$state.go("login");
    SWService.init();
}

appRun.$inject = [
    //'$state',
     'SWService'];

export default appRun;