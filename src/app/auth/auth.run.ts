import { TransitionService } from 'angular-ui-router';

import { preloadState } from '../shared/util.service';

function authRun($transitions: TransitionService) {

    $transitions.onSuccess({
        to: state => {
            return (state && state.includes["auth"]);
        }
    }, transition => preloadState(transition, "auth"));
    
}

authRun.$inject = ['$transitions', 'AuthService'];

export default authRun;