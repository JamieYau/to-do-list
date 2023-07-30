import Todo from "./todo";

class Project {
  constructor(title) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }

    this.title = title;
    this.todos = [];
  }

  setTitle(title) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }
    this.title = title;
  }

  addTodo(todo) {
    if (!(todo instanceof Todo)) {
      throw new Error("You can only add Todo objects to a project.");
    }
    this.todos.push(todo);
  }
}

export default Project;
