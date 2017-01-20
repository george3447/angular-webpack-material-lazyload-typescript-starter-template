import { module } from 'angular';
import Nav from './nav/nav.module';
import SideMenu from './side-menu/side-menu.module';

const Shared = module('home.shared', [
    Nav, SideMenu
]).name;

export default Shared;