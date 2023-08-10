import { v4 as uuidv4 } from "uuid";

class Todo {
  #id;
  #title;
  #description;
  #dueDate;
  #daysTillDue;
  #priority;
  #isComplete;
  #projectId;

  constructor(title, description, dueDate, priority) {
    if (title === "") {
      throw new Error("Title cannot be empty.");
    }

    this.#id = uuidv4();
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
    this.#daysTillDue = Math.ceil(
      (this.#dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    this.#priority = priority;
    this.#isComplete = false;
    this.#projectId = null;
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

  // Format the date to ISO format (yyyy-mm-dd)
  formatDateToISO() {
    const year = this.dueDate.getFullYear();
    const month = String(this.dueDate.getMonth() + 1).padStart(2, "0");
    const day = String(this.dueDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  get daysTillDue() {
    return this.#daysTillDue;
  }

  // Get the label for days till due
  getDaysTillDueLabel() {
    const daysTillDue = this.daysTillDue;
    if (daysTillDue === 1) {
      return "1 day left";
    } else if (daysTillDue === 0) {
      return "Due today";
    } else if (daysTillDue < 0) {
      return "Overdue";
    } else {
      return `${daysTillDue} days left`;
    }
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

  get projectId() {
    return this.#projectId;
  }

  set projectId(projectId) {
    this.#projectId = projectId;
  }
}

export default Todo;
