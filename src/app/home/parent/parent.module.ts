import { module } from "angular";

import Child from "./child/child.module";
import ChildOne from "./child-one/child-one.module";
import ChildTwo from "./child-two/child-two.module";
import parentComponent from "./parent.component";
import parentRouting from "./parent.routing";

const Sample = module("parent", [Child, ChildOne, ChildTwo])
	.component("parentComponent", parentComponent)
	.config(parentRouting).name;

export default Sample;
