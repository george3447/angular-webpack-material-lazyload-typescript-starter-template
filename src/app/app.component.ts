import { IComponentController, IComponentOptions } from 'angular';
import 'angular-material/angular-material.scss';

import './app.component.scss';

class AppController implements IComponentController {
    constructor() { }
}

const AppComponent: IComponentOptions = {
    controller: AppController,
    template: require('./app.component.html') as string
};

export default AppComponent;