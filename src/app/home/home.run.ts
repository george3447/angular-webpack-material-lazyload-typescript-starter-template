import { TransitionService } from '@uirouter/angularjs';
import AuthService from '../auth/shared/auth.service';
import { preloadState } from '../shared/util.service';

function homeRun($transitions: TransitionService, authService: AuthService) {

    $transitions.onStart({
        to: state => !!(state && state.$$state().includes["home"])
    }, transition => {
        let options = transition.options();
        return (options &&
            options.custom &&
            options.custom.ignoreAuthentication) ||
            authService.isAuthenticated();
    });

    $transitions.onSuccess({
        to: state => {
            return (state && state.$$state().includes["home"]);
        }
    }, transition => preloadState(transition, "lazyParent"));
    
}

homeRun.$inject = ['$transitions', 'AuthService'];

export default homeRun;