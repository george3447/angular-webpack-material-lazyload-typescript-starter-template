import { TransitionService, Transition } from "angular-ui-router";
import SideMenuService from './sideMenu.service';

function sideMenuRun($transitions: TransitionService, sideMenuService: SideMenuService) {
    
    $transitions.onSuccess({
        to: (state) => state.data && state.data.isMenuItem
    }, (transition: Transition) => {
        sideMenuService.selectMenuItem(transition.$to().self);
        console.log("Sidemenu serivice called");
    });
}

sideMenuRun.$inject = ['$transitions', 'SideMenuService'];

export default sideMenuRun;