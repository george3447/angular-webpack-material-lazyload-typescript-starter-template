import { IPromise } from "angular";

import { IAuthInfo, ILoginCriteria, IRecoverCriteria } from "./auth.models";
import DataService from "../../shared/data.service";

class AuthService {
	static $inject: Array<string> = ["DataService", "$cookies"];

	//private authInfo: IAuthInfo;

	constructor(
		private dataService: DataService,
		private $cookie: angular.cookies.ICookiesService
	) {}

	get(): IAuthInfo {
		return JSON.parse(this.$cookie.get("userId"));
	}

	logIn(loginCriteria: ILoginCriteria): IPromise<boolean> {
		return this.dataService.post("/bins", loginCriteria).then(data => {
			this.$cookie.put("userId", JSON.stringify(data));
			//this.authInfo = <IAuthInfo>data;
			return data;
		}) as IPromise<boolean>;
	}

	logOut(): IPromise<boolean> {
		return this.dataService.post("/bins", this.get()).then(() => {
			this.$cookie.remove("userId");
			return true;
		});
	}

	recover(recoverCriteria: IRecoverCriteria): IPromise<boolean> {
		return this.dataService.post("/bins", recoverCriteria).then(data => {
			this.$cookie.put("userId", JSON.stringify(data));
			return data;
		}) as IPromise<boolean>;
	}

	isAuthenticated(): IPromise<boolean> {
		return this.dataService.post(
			"/bins",
			this.$cookie.get("userId")
		) as IPromise<boolean>;
	}
}

export default AuthService;
