import { IComponentOptions, IComponentController, IAugmentedJQuery } from 'angular';
import { StateService } from '@uirouter/angularjs';

import AuthService from './shared/auth.service';
import { ILoginCriteria, IRecoverCriteria } from './shared/auth.models';
import './auth.component.scss';

interface IStateOptions {
    custom: any;
}

class AuthController implements IComponentController {

    version: string;

    static $inject = ['$element', '$state', 'AuthService'];

    constructor(
        private $element: IAugmentedJQuery,
        private $state: StateService,
        private authService: AuthService
    ) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
        this.version = "v" + __VERSION;
    }

    logIn(loginCriteria: ILoginCriteria) {
        this.authService.logIn(loginCriteria).then((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.$state.go('home', {}, <IStateOptions>{ custom: { ignoreAuthentication: true } });
            }
        });
    }

    recover(recoverCriteria: IRecoverCriteria) {
        this.authService.recover(recoverCriteria).then((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.$state.go('login', {}, <IStateOptions>{ custom: { ignoreAuthentication: true } });
            }
        });
    }

}

const AuthComponent: IComponentOptions = {
    controller: AuthController,
    template: require('./auth.component.html') as string
};

export default AuthComponent;