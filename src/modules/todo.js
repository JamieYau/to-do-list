class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
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
    // Check if the due date is a valid Date object
    if (!(dueDate instanceof Date) || isNaN(dueDate) || dueDate === "") {
      throw new Error("Due date must be a valid Date object.");
    }

    // Get the current date
    const currentDate = new Date();
    // Compare the due date with the current date
    if (dueDate < currentDate) {
      throw new Error("Due date must be in the present or future.");
    }

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
