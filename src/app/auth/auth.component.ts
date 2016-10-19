import { IComponentOptions, IComponentController, IAugmentedJQuery } from 'angular';

require('./auth.component.scss');

class AuthController implements IComponentController {

    static $inject = ['$element'];

    constructor(private $element: IAugmentedJQuery) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
    }

}

const AuthComponent: IComponentOptions = {
    controller: AuthController,
    template: require('./auth.component.html') as string
};

export default AuthComponent;