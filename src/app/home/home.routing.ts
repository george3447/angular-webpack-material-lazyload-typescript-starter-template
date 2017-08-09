import { StateProvider, Ng1StateDeclaration } from "@uirouter/angularjs";

import { IMenu } from "./shared/side-menu/shared/side-menu.models";

function configure($stateProvider: StateProvider) {
	//$urlServiceProvider.rules.initial("/parent");

	$stateProvider.state(
		"home",
		<Ng1StateDeclaration>{
			url: "/home",
			component: "homeComponent",
			redirectTo: "child"
		}
	).state(
			"parent",
			<Ng1StateDeclaration>{
				url: "/parent",
				parent: "home",
				abstract: true,
				component: "parentComponent",
				data: <IMenu>{ isMenuItem: true, navTitle: "parent" },
				redirectTo: "child"
			}
		).state(
			"lazyParent",
			<Ng1StateDeclaration>{
				url: "/lazy-parent",
				parent: "home",
				abstract: true,
				component: "lazyParentComponent",
				data: <IMenu>{ isMenuItem: true, navTitle: "lazy-parent" }
			}
		);
}

configure.$inject = ["$stateProvider"];

export default configure;
