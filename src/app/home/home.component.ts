import {
	IComponentController,
	IAugmentedJQuery,
	IComponentOptions
} from "angular";
import {
	StateDeclaration,
	StateService,
	Transition
} from "@uirouter/core";

import { Observable } from 'rxjs'

import AppState, { Todo } from "./shared/app-state";
import AuthService from "../auth/shared/auth.service";
import "./home.component.scss";

class HomeController implements IComponentController {
	activeMenuItem$: Observable<StateDeclaration>;
	todos$: Observable<Array<Todo>>;
	isMenuOpen: boolean;
	$transition$: Transition;

	static $inject = [
		"$element",
		"$state",
		"$mdMedia",
		"AuthService",
		"appState"
	];

	constructor(
		private $element: IAugmentedJQuery,
		private $state: StateService,
		private $mdMedia: ng.material.IMedia,
		private authService: AuthService,
		private appState: AppState
	) { }

	$onInit() {
		this.isMenuOpen = this.$mdMedia("gt-md");
		this.activeMenuItem$ = this.appState.activeMenuItem$;
		//this.todos$ = this.appState.todos$;
		this.$element.addClass("layout-column flex");
	}

	toggleSideMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	logout() {
		this.authService.logOut().then(() => {
			this.$state.go("login");
		});
	}
}

const homeComponent: IComponentOptions = {
	bindings: { $transition$: "<" },
	controller: HomeController,
	template: require("./home.component.html") as string
};

export default homeComponent;
