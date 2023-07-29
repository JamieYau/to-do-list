class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    const validPriorities = ["High", "Medium", "Low"];
    if (!validPriorities.includes(priority)) {
      throw new Error("Priority must be either High, Medium, or Low.");
    }
    this.priority = priority;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}

export default Todo;
