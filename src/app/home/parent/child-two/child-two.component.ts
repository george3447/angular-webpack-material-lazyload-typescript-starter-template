import { IComponentController, IComponentOptions } from 'angular';

import './child-two.component.scss';

class ChildTwoController implements IComponentController {

    constructor() { }

}

const childTwoComponent: IComponentOptions = {

    controller: ChildTwoController,
    template: require('./child-two.component.html') as string
};

export default childTwoComponent;