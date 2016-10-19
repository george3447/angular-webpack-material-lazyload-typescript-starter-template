import { TransitionService, StateService } from 'angular-ui-router';
import AuthService from './shared/auth.service';

function authRun($transitions: TransitionService, $state: StateService, authService: AuthService) {
    $transitions.onStart({
        to: function (state) {
            return !!(state && state.includes["home"]);
        }
    }, (transition) => {
        console.warn("Auth: Trigered");
        let options = transition.options();
        return options && options.custom && options.custom.ignoreAuthentication ? true : authService.isAuthenticated();
    });
    //$transitions.onSuccess({}, () => console.warn("Auth:Completed"));
}

authRun.$inject = ['$transitions', '$state', 'AuthService'];

export default authRun;