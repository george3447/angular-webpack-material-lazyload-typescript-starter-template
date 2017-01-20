import { module } from 'angular';

import appComponent from './app.component';
import configure from './app.config';
import runBlock from './app.run';
import Core from './core/core.module';
import Shared from './shared/shared.module';

const AppModule: string = module('app', [Core, Shared])
    .component('appComponent', appComponent)
    .config(configure)
    .run(runBlock)
    .name;

angular.bootstrap(document, [AppModule]);

