import { StateDeclaration, StateService } from '@uirouter/angularjs';

class SideMenuService {

    static $inject = ['$state'];

    constructor(private $state: StateService) {
    }

    getMenuItems(): Array<StateDeclaration> {
        let states: Array<StateDeclaration> = this.$state.get();
        let filteredStates: Array<StateDeclaration> = states.filter((obj: StateDeclaration) =>
            (obj.data && obj.data.isMenuItem && !obj.data.isChild));
        let formattedStates: Array<StateDeclaration> = filteredStates.map((parent: StateDeclaration) => {
            let filteredChildStates = states.filter((child: StateDeclaration) =>
                (child.data && child.data.isMenuItem && child.data.isChild &&
                    (child.parent === parent.name || child.data.parent === parent.name)));
            if (filteredChildStates.length > 0) {
                filteredChildStates.sort((childStateA: StateDeclaration, childStateB: StateDeclaration) => childStateA.name < childStateB ? -1 : 1);
                filteredChildStates.map((stateObj: StateDeclaration) => stateObj.data.isActive = false); // Reset inheritance from parent data
                parent.data.childrens = filteredChildStates;
            }
            return parent;
        });
        return formattedStates;
    }

}

export default SideMenuService;