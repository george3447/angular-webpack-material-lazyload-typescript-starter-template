import { IComponentController, IComponentOptions } from 'angular';

import './lazy-child-two.component.scss';

class LazyChildTwoController implements IComponentController {

    constructor() { }

}

const lazyChildTwoComponent: IComponentOptions = {

    controller: LazyChildTwoController,
    template: require('./lazy-child-two.component.html') as string
};

export default lazyChildTwoComponent;