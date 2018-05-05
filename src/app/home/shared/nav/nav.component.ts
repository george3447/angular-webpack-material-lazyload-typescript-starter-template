import { IComponentController, IComponentOptions } from "angular";
import { StateDeclaration } from "@uirouter/core";
import { Observable } from "rxjs";

import "./nav.component.scss";

class NavComponentController implements IComponentController {
	state: StateDeclaration;
	activeMenuItem$: Observable<StateDeclaration>;

	constructor() {}

	$onInit() {
		this.activeMenuItem$.subscribe((state: StateDeclaration) => {
			this.state = state;
		});
	}
}

const NavComponent: IComponentOptions = {
	controller: NavComponentController,
	template: require("./nav.component.html") as string,
	bindings: {
        activeMenuItem$: "<",
        todos$:"<",
		onToggleSideMenu: "&",
		onLogoutClick: "&"
	}
};

export default NavComponent;
