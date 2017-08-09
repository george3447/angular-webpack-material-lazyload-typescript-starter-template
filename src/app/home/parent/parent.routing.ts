import { StateProvider, Ng1StateDeclaration } from "@uirouter/angularjs";

import { IMenu } from "../shared/side-menu/shared/side-menu.models";

function configure($stateProvider: StateProvider) {
	// $urlServiceProvider.rules.initial("/child");

	$stateProvider
		.state(
			"child",
			<Ng1StateDeclaration>{
				parent: "parent",
				component: "childComponent",
				url: "/child",
				data: <IMenu>{
					isChild: true,
					navTitle: "Child Component",
					moduleTitle: "Child Component",
					isMenuItem: true
				}
			}
		)
		.state(
			"childOneComponent",
			<Ng1StateDeclaration>{
				parent: "parent",
				component: "childOneComponent",
				url: "/child-one",
				data: <IMenu>{
					isChild: true,
					navTitle: "Child One Component",
					moduleTitle: "Child One Component",
					isMenuItem: true
				}
			}
		)
		.state(
			"childTwoComponent",
			<Ng1StateDeclaration>{
				parent: "parent",
				component: "childTwoComponent",
				url: "/child-two",
				data: <IMenu>{
					isChild: true,
					navTitle: "Child Two Component",
					moduleTitle: "Child Two Component",
					isMenuItem: true
				}
			}
		);
}

configure.$inject = ["$stateProvider"];

export default configure;
