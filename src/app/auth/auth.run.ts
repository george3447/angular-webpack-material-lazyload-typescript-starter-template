import { TransitionService } from 'angular-ui-router';
import AuthService from './shared/auth.service';

function authRun($transitions: TransitionService, authService: AuthService) {
    $transitions.onStart({
        to: function (state) {
            return !!(state && state.includes["home"]);
        }
    }, (transition) => {
        let options = transition.options();
        return (options && options.custom && options.custom.ignoreAuthentication) || authService.isAuthenticated();
    });
}

authRun.$inject = ['$transitions', 'AuthService'];

export default authRun;