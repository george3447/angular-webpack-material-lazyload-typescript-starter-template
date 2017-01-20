import { module } from 'angular';

import Shared from './shared/shared.module';
import Parent from './parent/parent.module';
import LazyParent from './lazy-parent/lazy-parent.module';
import homeComponent from './home.component';
import homeRun from './home.run';

const Home = module('app.home',
    [
        Shared,
        Parent,
        LazyParent
    ])
    .component('homeComponent', homeComponent)
    .run(homeRun)
    .name;

export default Home;