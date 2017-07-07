import { IComponentController, IAugmentedJQuery, IComponentOptions } from 'angular';
import { StateObject, StateDeclaration, StateService, Transition } from '@uirouter/angularjs';

import AuthService from '../auth/shared/auth.service';
import './home.component.scss';

class HomeController implements IComponentController {

    activeState: StateDeclaration;
    isMenuOpen: boolean;
    $transition$: Transition;

    static $inject = ['$element', '$state', '$mdMedia', 'AuthService'];

    constructor(private $element: IAugmentedJQuery,
        private $state: StateService,
        private $mdMedia: ng.material.IMedia,
        private authService: AuthService) { }

    $onInit() {
        this.isMenuOpen = this.$mdMedia("gt-md");
        this.activeState = this.$transition$.to();
        this.$element.addClass('layout-column flex');
    }

    selectState(selectedState: StateDeclaration) {
        this.$state.go(selectedState).then((state: StateObject) => {
            if (state.name === selectedState.name) {
                this.activeState = selectedState;
            }
        });
    }

    toggleSideMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    logOut() {
        this.authService.logOut().then(() => { this.$state.go('auth'); });
    }
}

const homeComponent: IComponentOptions = {
    bindings: { $transition$: '<' },
    controller: HomeController,
    template: require('./home.component.html') as string
};

export default homeComponent;