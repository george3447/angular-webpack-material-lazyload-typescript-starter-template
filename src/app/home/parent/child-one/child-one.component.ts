import { IComponentController, IComponentOptions } from 'angular';

import './child-one.component.scss';

class ChildOneController implements IComponentController {

    constructor() { }

}

const childOneComponent: IComponentOptions = {

    controller: ChildOneController,
    template: require('./child-one.component.html') as string
};

export default childOneComponent;