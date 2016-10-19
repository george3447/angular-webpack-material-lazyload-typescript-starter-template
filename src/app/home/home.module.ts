import { module } from 'angular';

import Shared from './shared/shared.module';
import Parent from './parent/parent.module';
import LazyParent from './lazy-parent/lazy-parent.module';
import HomeComponent from './home.component';
import homeConfigure from './home.config';

const Home = module('app.home',
    [
        Shared,
        Parent,
        LazyParent
    ])
    .component('homeComponent', HomeComponent)
    .config(homeConfigure)
    .name;

export default Home;