import { IComponentController, IAugmentedJQuery, IComponentOptions } from 'angular';

import './lazy-parent.component.scss';

class LazyParentController implements IComponentController {

    static $inject = ['$element'];

    constructor(private $element: IAugmentedJQuery) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
    }
}

const lazyParentComponent: IComponentOptions = {
    controller: LazyParentController,
    template: require('./lazy-parent.component.html') as string
};

export default lazyParentComponent;