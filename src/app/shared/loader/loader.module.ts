import { module } from 'angular';
import LoaderService from './loader.service';
import loaderComponent from './loader.component';
import loaderConfigure from './loader.config';
import loaderRun from './loader.run';

const loader = module('loader', [])
    .service('LoaderService', LoaderService)
    .component('loader', loaderComponent)
    .config(loaderConfigure)
    .run(loaderRun)
    .name;

export default loader;