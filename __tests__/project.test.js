import Project from "../src/modules/project";
import Todo from "../src/modules/todo";

describe("Project", () => {
  let project;
  beforeEach(() => {
    project = new Project("My Project");
  });

  describe("constructor", () => {
    test("creates a new project with the correct title", () => {
      // Assert
      expect(project.title).toBe("My Project");
    });

    test("throws an error if the title is empty", () => {
      // Arrange
      const title = "";
      // Act & Assert
      expect(() => {
        new Project(title);
      }).toThrow("Title cannot be empty.");
    });

    test("creates a new project with an empty todos array", () => {
      // Assert
      expect(project.todos).toEqual([]);
    });
  });

  describe("setTitle", () => {
    test("updates the title correctly", () => {
      // Arrange
      const newTitle = "My New Project";
      // Act
      project.setTitle(newTitle);
      // Assert
      expect(project.title).toBe(newTitle);
    });

    test("throws an error if the title is empty", () => {
      // Arrange
      const newTitle = "";
      // Act & Assert
      expect(() => {
        project.setTitle(newTitle);
      }).toThrow("Title cannot be empty.");
    });
  });

  describe("addTodo", () => {
    test("adds a todo to the todos array", () => {
      // Arrange
      const todo = new Todo(
        "Buy groceries",
        "Remember to buy milk, eggs, and vegetables.",
        "2023-08-31",
        "High"
      );
      // Act
      project.addTodo(todo);
      // Assert
      expect(project.todos).toContain(todo);
    });

    test("throws an error if the todo is not a Todo object", () => {
      // Arrange
      const todo = "Buy groceries";
      // Act & Assert
      expect(() => {
        project.addTodo(todo);
      }).toThrow("You can only add Todo objects to a project.");
    });

    test("add multiple todos to the todos array", () => {
      // Arrange
      const todo1 = new Todo(
        "Buy groceries",
        "Remember to buy milk, eggs, and vegetables.",
        "2023-08-31",
        "High"
      );
      const todo2 = new Todo(
        "Do laundry",
        "Remember to separate the whites and colors.",
        "2023-08-31",
        "High"
      );
      // Act
      project.addTodo(todo1);
      project.addTodo(todo2);
      // Assert
      expect(project.todos.length).toBe(2);
      expect(project.todos).toContain(todo1);
      expect(project.todos).toContain(todo2);
    });
  });
});