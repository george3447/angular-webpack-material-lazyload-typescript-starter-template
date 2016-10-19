import { IComponentController, IComponentOptions } from 'angular';

import './child.component.scss';

class ChildController implements IComponentController {

    constructor() { }

}

const childComponent: IComponentOptions = {

    controller: ChildController,
    template: require('./child.component.html') as string
};

export default childComponent;