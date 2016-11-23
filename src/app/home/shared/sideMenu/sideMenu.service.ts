import { StateDeclaration, StateService } from 'angular-ui-router';
import { Subject } from 'rxjs/Subject';

class SideMenuService {

    static $inject = ['$state'];

    private toggleRequestedSource = new Subject<() => any>();
    private menuItemSelectionRequestedSource = new Subject<StateDeclaration>();

    toggleRequested$ = this.toggleRequestedSource.asObservable();
    menuItemSelectionRequested$ = this.menuItemSelectionRequestedSource.asObservable();
    states: Array<StateDeclaration>;

    constructor(private $state: StateService) {
    }

    toggle(callBackFunction?: () => any) {
        this.toggleRequestedSource.next(callBackFunction);
    }

    selectMenuHeader(menuItem: StateDeclaration): void {
        if (menuItem.data.isOpen) {
            menuItem.data.isOpen = false;
            menuItem.data.isActive = this.isActiveMenuItem(menuItem);
            return;
        }
        menuItem.data.isOpen = true;
        menuItem.data.isActive = true;
    }

    selectMenuItem(menuItem: StateDeclaration): void {
        this.resetActiveMenuItem(menuItem);
        this.menuItemSelectionRequestedSource.next(menuItem);
    }

    loadMenuItems(): void {
        let states: Array<StateDeclaration> = this.$state.get();
        let filteredStates: Array<StateDeclaration> = states.filter((obj: StateDeclaration) =>
            (obj.data && obj.data.isMenuItem && !obj.data.isChild));
        let formattedStates: Array<StateDeclaration> = filteredStates.map((parent: StateDeclaration) => {
            let filteredChildStates = states.filter((child: StateDeclaration) =>
                (child.data && child.data.isMenuItem && child.data.isChild &&
                    (child.parent === parent.name || child.data.parent === parent.name)));
            if (filteredChildStates.length > 0) {
                filteredChildStates.map((stateObj: StateDeclaration) => stateObj.data.isActive = false); // Reset inheritance from parent data
                parent.data.childrens = filteredChildStates;
            }
            return parent;
        });
        this.states = formattedStates;
    }

    private resetActiveMenuItem(state: StateDeclaration): void {
        let parentStates: Array<StateDeclaration> = this.states.filter((stateObj: StateDeclaration) =>
            ((stateObj.name !== state.name && stateObj.name !== state.parent) && stateObj.abstract && stateObj.data.isOpen));
        parentStates.map(stateObj => {
            stateObj.data.isOpen = false;
            stateObj.data.isActive = false;
        });
    }

    private isActiveMenuItem(menuItem: StateDeclaration) {
        return this.$state.includes(menuItem.name);
    }

}

export default SideMenuService;