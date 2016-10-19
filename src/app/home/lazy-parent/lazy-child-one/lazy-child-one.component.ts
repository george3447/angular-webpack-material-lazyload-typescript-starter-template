import { IComponentController, IComponentOptions } from 'angular';

import './lazy-child-one.component.scss';

class LazyChildOneController implements IComponentController {

    constructor() { }

}

const lazyChildOneComponent: IComponentOptions = {
    controller: LazyChildOneController,
    template: require('./lazy-child-one.component.html') as string
};

export default lazyChildOneComponent;