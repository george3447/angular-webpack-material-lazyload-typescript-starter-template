import { module } from 'angular';
import SideMenuService from './shared/side-menu.service';
import sideMenuComponent from './side-menu.component';

const sideMenu = module('sideMenu', [])
    .service('SideMenuService', SideMenuService)
    .component('sideMenu', sideMenuComponent)
    .name;

export default sideMenu;