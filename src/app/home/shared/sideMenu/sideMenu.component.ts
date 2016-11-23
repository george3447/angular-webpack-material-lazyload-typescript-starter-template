import { IComponentController, IComponentOptions } from 'angular';
import { StateDeclaration } from 'angular-ui-router';

import SideMenuService from './sideMenu.service';
import './sideMenu.component.scss';

const sideMenuComponent = "mdSideNavSideMenu";
const sideMenuAllowedScreenSize = "gt-md";

class SideMenuController implements IComponentController {

    static $inject = ['SideMenuService', '$mdSidenav', '$mdMedia'];

    private sideMenuObj: ng.material.ISidenavObject;

    isOpen: boolean;
    isLockedOpen: boolean;
    states: Array<StateDeclaration>;
    onSelectState: Function;

    constructor(
        private sideMenuService: SideMenuService,
        private $mdSidenav: ng.material.ISidenavService,
        private $mdMedia: ng.material.IMedia

    ) {

        sideMenuService.toggleRequested$.subscribe(() => this.toggle());
        sideMenuService.menuItemSelectionRequested$.subscribe(menuItem => this.onMenuClick(menuItem));
        this.states = sideMenuService.states;
    }

    $postLink() {
        this.sideMenuObj = this.$mdSidenav(sideMenuComponent);
        this.isLockedOpen = this.$mdMedia(sideMenuAllowedScreenSize);
    }

    onMenuClick(state: StateDeclaration) {
        if (!state.abstract) {
            this.onSelectState({ selectedState: state });
        }
        else {
            this.sideMenuService.selectMenuHeader(state);
        }
    }

    toggle() {
        if (this.$mdMedia(sideMenuAllowedScreenSize)) {
            this.isLockedOpen = !this.isLockedOpen;
        }
        else {
            this.isOpen = !this.isOpen;
        }
    }
}

const SideMenuComponent: IComponentOptions = {

    controller: SideMenuController,
    template: require('./sideMenu.component.html') as string,
    bindings: {
        onSelectState: '&'
    }
};

export default SideMenuComponent;