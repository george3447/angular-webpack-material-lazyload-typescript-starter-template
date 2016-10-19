import { IComponentController, IAugmentedJQuery, IComponentOptions } from 'angular';

import SideMenuService from './shared/sideMenu/sideMenu.service';
import { State } from 'angular-ui-router';

class HomeController implements IComponentController {

    selectedState: State;

    static $inject = ['$element', 'SideMenuService'];

    constructor(private $element: IAugmentedJQuery, private sideMenuService: SideMenuService) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
        this.sideMenuService.loadMenuItems();
    }

    selectState(selectedState: State) {
        this.selectedState = selectedState;
    }
}

const homeComponent: IComponentOptions = {
    controller: HomeController,
    template: require('./home.component.html') as string
};

export default homeComponent;