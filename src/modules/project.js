import Todo from "./todo";

class Project {
  #title;
  #todos;

  constructor(title) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }

    this.#title = title;
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
}

export default Project;
