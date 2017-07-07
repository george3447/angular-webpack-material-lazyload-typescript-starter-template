import { IPromise } from 'angular';

import { IAuthInfo, ILoginCriteria, IRecoverCriteria } from './auth.models';
import DataService from '../../shared/data.service';

class AuthService {

    static $inject: Array<string> = ['DataService'];

    private authInfo: IAuthInfo;

    constructor(private dataService: DataService) { }

    get(): IAuthInfo {
        return this.authInfo;
    }

    logIn(loginCriteria: ILoginCriteria): IPromise<boolean> {
        return this.dataService.post("/bins", loginCriteria).then(data => {
            this.authInfo = <IAuthInfo>data;
            return data;
        }) as IPromise<boolean>;
    }

    logOut(): IPromise<boolean> {
        return this.dataService.post("/bins", this.authInfo) as IPromise<boolean>;
    }

    recover(recoverCriteria: IRecoverCriteria): IPromise<boolean> {
        return this.dataService.post("/bins", recoverCriteria).then(data => {
            this.authInfo = <IAuthInfo>data;
            return data;
        }) as IPromise<boolean>;
    }

    isAuthenticated(): IPromise<boolean> {
        return this.dataService.post("/bins", this.authInfo) as IPromise<boolean>;
    }

}

export default AuthService;