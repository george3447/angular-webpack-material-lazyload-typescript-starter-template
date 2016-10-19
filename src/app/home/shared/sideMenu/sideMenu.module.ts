import { module } from 'angular';
import SideMenuService from './sideMenu.service';
import SideMenuComponent from './sideMenu.component';
import sideMenuRun from './sideMenu.run';

const sideMenu = module('sideMenu', [])
    .service('SideMenuService', SideMenuService)
    .component('sideMenu', SideMenuComponent)
    .run(sideMenuRun)
    .name;

export default sideMenu;