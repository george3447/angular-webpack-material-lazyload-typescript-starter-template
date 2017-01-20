import { IComponentController, IComponentOptions } from 'angular';
import { StateDeclaration } from 'angular-ui-router';

import SideMenuService from './shared/side-menu.service';
import './side-menu.component.scss';

class SideMenuController implements IComponentController {

    static $inject = ['SideMenuService'];

    isLockedOpen: boolean;
    onSelectState: Function;
    activeMenuItem: StateDeclaration;
    menuItems: Array<StateDeclaration>;

    constructor(
        private sideMenuService: SideMenuService
    ) { }

    $onInit() {
        this.menuItems = this.sideMenuService.getMenuItems();
        this.menuItems.map(menuItem => {
            if (menuItem.name === this.activeMenuItem.parent) {
                menuItem.data.isOpen = true;
            }
        });
    }

    onMenuClick(state: StateDeclaration) {
        this.menuItems.map(menuItem => {
            if (menuItem.name !== state.name) {
                menuItem.data.isOpen = false;
            }
        });
        state.data.isOpen = !state.data.isOpen;
    }

    onMenuItemClick(state: StateDeclaration) {
        this.onSelectState({ selectedState: state });
    }
}

const SideMenuComponent: IComponentOptions = {

    controller: SideMenuController,
    template: require('./side-menu.component.html') as string,
    bindings: {
        menuItems: '<',
        activeMenuItem: '<',
        onSelectState: '&'
    }
};

export default SideMenuComponent;