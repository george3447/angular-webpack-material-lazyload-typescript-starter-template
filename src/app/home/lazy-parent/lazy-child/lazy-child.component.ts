import { IComponentController, IComponentOptions } from 'angular';

import './lazy-child.component.scss';

class LazyChildController implements IComponentController {

    constructor() { }

}

const lazyChildComponent: IComponentOptions = {

    controller: LazyChildController,
    template: require('./lazy-child.component.html') as string
};

export default lazyChildComponent;