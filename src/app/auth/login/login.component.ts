import { IComponentController, IAugmentedJQuery, IComponentOptions, copy } from 'angular';

import { ILoginCriteria } from '../shared/auth.models';
import './login.component.scss';

const loginCriteriaTemp: ILoginCriteria = {
    userName: null,
    password: null
};

class LoginController implements IComponentController {

    static $inject = ['$element'];

    onLogIn: Function;

    private loginCriteria: ILoginCriteria;

    constructor(private $element: IAugmentedJQuery) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
        this.loginCriteria = copy(loginCriteriaTemp);
    }

    onSubmit(isValid: boolean) {

        if (isValid) {
            this.onLogIn({ loginCriteria: this.loginCriteria });
        }
    }

    onCancel(form: ng.IFormController) {
        this.loginCriteria = copy(loginCriteriaTemp);
        form.$setPristine();
        form.$setUntouched();
    }

}

const loginComponent: IComponentOptions = {
    bindings: {
        onLogIn: '&'
    },
    controller: LoginController,
    template: require('./login.component.html') as string
};

export default loginComponent;