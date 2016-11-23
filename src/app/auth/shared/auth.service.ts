import { IPromise } from 'angular';
import DataService from '../../shared/data.service';

export interface ILoginCriteria {
    userName: string;
    password: string;
}

export interface IAuthInfo {
    userName: string;
    token: string;
}

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
        });
    }

    logOut(): IPromise<boolean> {
        return this.dataService.post("/bins", this.authInfo);
    }

    recover(): IPromise<boolean> {
        return this.dataService.post("/bins", this.authInfo);
    }

    isAuthenticated(): IPromise<boolean> {
        return this.dataService.post("/bins", this.authInfo);
    }

}

export default AuthService;