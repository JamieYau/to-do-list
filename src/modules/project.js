import Todo from "./todo";
import { v4 as uuidv4 } from "uuid";

class Project {
  #id;
  #title;
  #todos;

  constructor(title) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }

    this.#title = title;
    this.#id = uuidv4();
    this.#todos = [];
  }

  get title() {
    return this.#title;
  }

  set title(newTitle) {
    if (newTitle === "") {
      throw new Error("Title cannot be empty.");
    }
    this.#title = newTitle;
  }

  get id() {
    return this.#id;
  }

  get todos() {
    return this.#todos;
  }

  addTodo(todo) {
    if (!(todo instanceof Todo)) {
      throw new Error("You can only add Todo objects to a project.");
    }
    this.#todos.push(todo);
  }

  removeTodo(id) {
    const index = this.#todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error("Todo not found.");
    }
    this.#todos.splice(index, 1);
  }

  filterTodosByCompleteStatus(isComplete) {
    return this.#todos.filter((todo) => todo.isComplete === isComplete);
  }

  filterTodosByPriority(priority) {
    return this.#todos.filter((todo) => todo.priority === priority);
  }
}

export default Project;
