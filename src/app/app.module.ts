import { module } from 'angular';

import AppComponent from './app.component';
import configure from './app.config';
import Core from './core/core.module';
import Shared from './shared/shared.module';


const root = module('app', [
    Core,
    Shared,
]).component('appComponent', AppComponent)
    .config(configure)
    .run(['$state', function ($state) {
        $state.go('auth');
    }])
    .name;

export default root;