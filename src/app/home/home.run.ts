import { TransitionService, StateObject } from "@uirouter/angularjs";
import AuthService from "../auth/shared/auth.service";
import AppState from "./shared/app-state";
//import { preloadState } from "../shared/util.service";

function homeRun(
	$transitions: TransitionService,
	authService: AuthService,
	appState: AppState
) {
	$transitions.onStart(
		{
			to: (state:StateObject) => !!(state && state.includes["home"])
		},
		transition => {
			let options = transition.options();
			return (
				(options &&
					options.custom &&
					options.custom.ignoreAuthentication) ||
				authService.isAuthenticated()
			);
		}
	);

	$transitions.onSuccess(
		{
			to: state => {
				return state && state.includes["home"];
			}
		},
		transition => appState.setActiveMenu(transition.to())
	);

	$transitions.onError(
		{
			to: state => {
				return state && state.includes["home"];
			}
		},
		error => console.log(error)
	);
}

homeRun.$inject = ["$transitions", "AuthService", "appState"];

export default homeRun;
