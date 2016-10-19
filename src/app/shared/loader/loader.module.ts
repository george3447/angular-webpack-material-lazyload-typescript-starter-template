import { module } from 'angular';
import LoaderService from './loader.service';
import LoaderComponent from './loader.component';
import loaderConfigure from './loader.config';
import loaderRun from './loader.run';

const loader = module('loader', [])
    .service('LoaderService', LoaderService)
    .component('loader', LoaderComponent)
    .config(loaderConfigure)
    .run(loaderRun)
    .name;

export default loader;