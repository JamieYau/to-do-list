import { v4 as uuidv4 } from "uuid";

class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #isComplete;

  constructor(title, description, dueDate, priority) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }

    this.#id = uuidv4();
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
    this.#priority = priority;
    this.#isComplete = false;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }
    this.#title = title;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(dueDate) {
    if (!(dueDate instanceof Date) || isNaN(dueDate) || dueDate === "") {
      throw new Error("Due date must be a valid Date object.");
    }

    const currentDate = new Date();
    if (dueDate < currentDate) {
      throw new Error("Due date must be in the present or future.");
    }

    this.#dueDate = dueDate;
  }

  get priority() {
    return this.#priority;
  }

  set priority(priority) {
    const validPriorities = ["High", "Medium", "Low"];
    if (!validPriorities.includes(priority)) {
      throw new Error("Priority must be either High, Medium, or Low.");
    }
    this.#priority = priority;
  }

  get isComplete() {
    return this.#isComplete;
  }

  set isComplete(isComplete) {
    this.#isComplete = isComplete;
  }

  toggleComplete() {
    this.#isComplete = !this.#isComplete;
  }
}

export default Todo;
