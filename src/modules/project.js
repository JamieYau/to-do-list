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
}

export default Project;
