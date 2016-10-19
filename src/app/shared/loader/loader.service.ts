import { Subject } from 'rxjs/Subject';

class LoaderService {
    private showRequestedSource = new Subject<string>();
    private hideRequestedSource = new Subject<string>();

    constructor() { }

    showRequested$ = this.showRequestedSource.asObservable();
    hideRequested$ = this.hideRequestedSource.asObservable();

    show() {
        this.showRequestedSource.next(null);
    }

    hide() {
        this.hideRequestedSource.next(null);
    }
}

export default LoaderService;