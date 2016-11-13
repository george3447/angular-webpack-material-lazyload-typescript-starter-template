import { IComponentController, IAugmentedJQuery, IComponentOptions } from 'angular';
import { StateService } from 'angular-ui-router';

import AuthService, { ILoginCriteria } from '../shared/auth.service';
import './login.component.scss';


interface IStateOptions {
    custom: any;
}

const loginCriteriaTemp: ILoginCriteria = {
    userName: null,
    password: null
};

class LoginController implements IComponentController {

    private loginCriteria: ILoginCriteria;

    static $inject = ['$element', 'AuthService', '$state'];

    constructor(private $element: IAugmentedJQuery,
        private authService: AuthService,
        private $state: StateService) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
        this.loginCriteria = angular.copy(loginCriteriaTemp);
    }

    onSubmit(isValid: boolean) {

        if (isValid) {
            this.authService.logIn(this.loginCriteria)
                .then((isAuthenticard: boolean) => {
                    if (isAuthenticard) {
                        this.$state.go('home', {}, <IStateOptions>{ custom: { ignoreAuthentication: true } });
                    }
                });
        }
    }

    onCancel(form: ng.IFormController) {
        this.loginCriteria = angular.copy(loginCriteriaTemp);
        form.$setPristine();
        form.$setUntouched();
    }

}

const loginComponent: IComponentOptions = {
    controller: LoginController,
    template: require('./login.component.html') as string
};

export default loginComponent;