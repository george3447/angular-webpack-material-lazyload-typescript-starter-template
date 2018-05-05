import { module } from "angular";
import Nav from "./nav/nav.module";
import SideMenu from "./side-menu/side-menu.module";
import AppState from "./app-state";

const Shared = module("home.shared", [Nav, SideMenu]).service(
	"appState",
	AppState
).name;

export default Shared;
