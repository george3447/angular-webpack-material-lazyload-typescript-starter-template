import { module } from "angular";

import Shared from "./shared/shared.module";
import Parent from "./parent/parent.module";
import LazyParent from "./lazy-parent/lazy-parent.module";
import homeComponent from "./home.component";
import homeRun from "./home.run";
import homeRouting from "./home.routing";

const Home = module("app.home", [Shared, Parent, LazyParent])
	.config(homeRouting)
	.component("homeComponent", homeComponent)
	.run(homeRun).name;

export default Home;
