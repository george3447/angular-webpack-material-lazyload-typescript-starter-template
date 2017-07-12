import { module, bootstrap } from 'angular';

import "core-js";
import "babel-polyfill";

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

bootstrap(document, [AppModule]);

