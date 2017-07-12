import { module } from 'angular';
import DataService from './data.service';
import HelperService from './helper.service';
import MessageService from './message.service';
import SWService from './sw.service';
import Loader from './loader/loader.module';

const Shared = module('app.shared', [Loader])
    .service('DataService', DataService)
    .service('HelperService', HelperService)
    .service('MessageService', MessageService)
    .service('SWService', SWService)
    .name;

export default Shared;