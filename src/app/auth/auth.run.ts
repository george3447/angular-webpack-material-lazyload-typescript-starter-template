import { TransitionService, StateService } from "@uirouter/angularjs";

import { preloadState } from "../shared/util.service";

function authRun($transitions: TransitionService, $state: StateService) {
	$transitions.onSuccess(
		{
			to: state => {
				return state && state.$$state().includes["auth"];
			}
		},
		transition => preloadState(transition, "auth")
	);

	$transitions.onStart(
		{
			to:state => {
				return state && state.$$state().includes["auth"];
			}
		},
		() => {
			return $state.target("home");
		}
	);
}

authRun.$inject = ["$transitions", "$state"];

export default authRun;
