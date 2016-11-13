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
    }

    private hide() {
        this.isVisible = false;
    }

}

const LoaderComponent: IComponentOptions = {

    controller: LoaderController,
    template: require('./loader.component.html') as string
    
};

export default LoaderComponent;