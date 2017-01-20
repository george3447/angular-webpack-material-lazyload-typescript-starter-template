import { module } from 'angular';

import Child from './child/child.module';
import ChildOne from './child-one/child-one.module';
import ChildTwo from './child-two/child-two.module';
import parentComponent from './parent.component';
import parentConfigure from './parent.config';

const Sample = module('parent', [Child, ChildOne, ChildTwo])
    .component('parentComponent', parentComponent)
    .config(parentConfigure)
    .name;

export default Sample;