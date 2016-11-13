import { IComponentController, IAugmentedJQuery, IComponentOptions } from 'angular';

import './recover.component.scss';

interface IRecoverCriteria {
    userName: string;
    password: string;
}

const recoverCriteriaTemp: IRecoverCriteria = {
    userName: null,
    password: null
};

class RecoverController implements IComponentController {

    private recoverCriteria: IRecoverCriteria;

    static $inject = ['$element'];
    constructor(private $element: IAugmentedJQuery) { }

    $onInit() {
        this.$element.addClass('layout-column flex');
        this.recoverCriteria = angular.copy(recoverCriteriaTemp);
    }

    onSubmit(isValid: boolean) {

        if (isValid) {
        }
    }

    onCancel(form: ng.IFormController) {
        this.recoverCriteria = angular.copy(recoverCriteriaTemp);
        form.$setPristine();
        form.$setUntouched();
    }

}

const recoverComponent: IComponentOptions = {
    controller: RecoverController,
    template: require('./recover.component.html') as string
};

export default recoverComponent;