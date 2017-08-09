import { module } from "angular";
import * as ngMaterial from "angular-material";
import * as ngCookies from "angular-cookies";
import uiRouter from "@uirouter/angularjs";

import configure from "./core.config";

const core = module("app.core", [
	ngMaterial,
	ngCookies,
	uiRouter,
	"ngMessages",
	"oc.lazyLoad"
]).config(configure).name;

export default core;
