import { Subject } from 'rxjs/Subject';

class LoaderService {

    private showRequestedSource = new Subject<boolean>();

    constructor() { }

    showRequested$ = this.showRequestedSource.asObservable();

    show() {
        this.showRequestedSource.next(true);
    }

    hide() {
        this.showRequestedSource.next(false);
    }
}

export default LoaderService;