import { IComponentController, IComponentOptions } from 'angular';

import LoaderService from './loader.service';
import './loader.component.scss';

class LoaderController implements IComponentController {

    static $inject = ['LoaderService'];

    private isVisible: boolean;

    constructor(private loaderService: LoaderService) {
        loaderService.showRequested$.subscribe(message => this.show());
        loaderService.hideRequested$.subscribe(() => this.hide());
    }

    private show() {
        this.isVisible = true;
        console.log("Loader called");
    }

    private hide() {
        this.isVisible = false;
        console.log("Loader invisible");
    }

}

const LoaderComponent: IComponentOptions = {

    controller: LoaderController,
    template: require('./loader.component.html') as string
    
};

export default LoaderComponent;