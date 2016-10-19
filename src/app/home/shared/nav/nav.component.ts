import { IComponentController, IComponentOptions } from 'angular';
import { StateService } from 'angular-ui-router';

import AuthService from '../../../auth/shared/auth.service';
import SideMenuService from '../sideMenu/sideMenu.service';

class NavController implements IComponentController {

    static $inject = ['$state', 'AuthService', 'SideMenuService'];

    constructor(private $state: StateService, private authService: AuthService, private sideMenuService: SideMenuService) { }

    toggleSideMenu() {
        this.sideMenuService.toggle();
    }

    logOut() {
        this.authService.logOut().then(() => { this.$state.go("auth"); });
    }
}


const NavComponent: IComponentOptions = {

    controller: NavController,
    template: require('./nav.component.html') as string,
    bindings: { state: '<' }
};

export default NavComponent;