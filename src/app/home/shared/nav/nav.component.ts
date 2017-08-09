import { IComponentOptions } from 'angular';

import './nav.component.scss';

const NavComponent: IComponentOptions = {

    template: require('./nav.component.html') as string,
    bindings: {
        state: '<',
        onToggleSideMenu: '&',
        onLogOutClick: '&'
    }
};

export default NavComponent;