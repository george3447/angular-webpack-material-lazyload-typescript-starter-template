import { Subject } from "rxjs";
//import { BehaviorSubject } from "rxjs/BehaviorSubject";
//import { Observable } from "rxjs";
import { StateDeclaration } from "@uirouter/core";

//import TodoService from "../todo/shared/todo.service";

export interface Todo {
	title: string;
	completed: boolean;
}

class AppState {
	static $inject = [];

	private activeMenuItemSubject = new Subject<StateDeclaration>();

	// private todosSubject = new BehaviorSubject<Array<Todo>>([
	// 	{
	// 		name: "Buy Milk",
	// 		isCompleted: false
	// 	}
	// ]);

	constructor(
		//private TodoService: TodoService
	) {}

	activeMenuItem$ = this.activeMenuItemSubject.asObservable();

	//todos$ = Observable.interval(1000)
	//	.switchMap(() => this.TodoService.get())
	//	.share(); //Observable.fromPromise(this.TodoService.get()).timer;

	setActiveMenu(state: StateDeclaration) {
		this.activeMenuItemSubject.next(state);
	}

	setTodos() {
		//this.todosSubject.next(todos);
	}
}

export default AppState;
