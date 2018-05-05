import { IComponentController, IComponentOptions } from "angular";
import { StateDeclaration } from "@uirouter/angularjs";
import { Observable } from "rxjs";

import SideMenuService from "./shared/side-menu.service";
import "./side-menu.component.scss";

class SideMenuController implements IComponentController {
	static $inject = ["SideMenuService"];

	isLockedOpen: boolean;
	onSelectState: Function;
	activeMenuItem$: Observable<StateDeclaration>;
	activeMenuItem: StateDeclaration;
	menuItems: Array<StateDeclaration>;

	constructor(private sideMenuService: SideMenuService) {}

	$onInit() {
		this.menuItems = this.sideMenuService.getMenuItems();
		this.activeMenuItem$.subscribe(state => {
			this.activeMenuItem = state;
			this.menuItems.map(menuItem => {
				menuItem.data.isOpen =
					menuItem.name === this.activeMenuItem.parent;
			});
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
}

const SideMenuComponent: IComponentOptions = {
	controller: SideMenuController,
	template: require("./side-menu.component.html") as string,
	bindings: {
		activeMenuItem$: "<"
	}
};

export default SideMenuComponent;
