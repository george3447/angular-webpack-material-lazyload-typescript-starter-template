import { IComponentController, IAugmentedJQuery, IComponentOptions } from 'angular';

import './parent.component.scss';

class ParentController implements IComponentController {

    static $inject = ['$element'];

    constructor(private $element: IAugmentedJQuery) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
    }
}

const ParentComponent: IComponentOptions = {
    controller: ParentController,
    template: require('./parent.component.html') as string
};

export default ParentComponent;