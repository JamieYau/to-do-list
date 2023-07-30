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

  removeTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error("Todo not found.");
    }
    this.todos.splice(index, 1);
  }
}

export default Project;
