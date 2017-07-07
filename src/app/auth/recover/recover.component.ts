import { IComponentController, IAugmentedJQuery, IComponentOptions, copy } from 'angular';

import { IRecoverCriteria } from '../shared/auth.models';
import './recover.component.scss';

const recoverCriteriaTemp: IRecoverCriteria = {
    userName: null
};

class RecoverController implements IComponentController {

    onRecover: Function;
    private recoverCriteria: IRecoverCriteria;

    static $inject = ['$element'];
    constructor(private $element: IAugmentedJQuery) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
        this.recoverCriteria = copy(recoverCriteriaTemp);
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.onRecover({ recoverCriteria: this.recoverCriteria });
        }
    }

    onCancel(form: ng.IFormController) {
        this.recoverCriteria = copy(recoverCriteriaTemp);
        form.$setPristine();
        form.$setUntouched();
    }
}

const recoverComponent: IComponentOptions = {
    bindings: {
        onRecover: '&'
    },
    controller: RecoverController,
    template: require('./recover.component.html') as string
};

export default recoverComponent;