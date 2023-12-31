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
      // Arrange & Act & Assert
      expect(() => {
        new Project("");
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
      project.title = newTitle;
      // Assert
      expect(project.title).toBe(newTitle);
    });

    test("throws an error if the title is empty", () => {
      // Arrange & Act & Assert
      expect(() => {
        project.title = "";
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
      // Arrange & Act & Assert
      expect(() => {
        project.addTodo("Buy groceries");
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

  describe("removeTodo", () => {
    test("removes a todo from the todos array", () => {
      // Arrange
      const todo = new Todo(
        "Buy groceries",
        "Remember to buy milk, eggs, and vegetables.",
        "2023-08-31",
        "High"
      );
      project.addTodo(todo);
      const id = todo.id;
      // Act
      project.removeTodo(id);
      // Assert
      expect(project.todos.length).toBe(0);
      expect(project.todos).not.toContain(todo);
    });

    test("throws an error if the todo is not found", () => {
      // Arrange
      const id = "123";
      // Act & Assert
      expect(() => {
        project.removeTodo(id);
      }).toThrow("Todo not found.");
    });

    test("removes multiple todos from the todos array", () => {
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
      project.addTodo(todo1);
      project.addTodo(todo2);
      const id1 = todo1.id;
      const id2 = todo2.id;
      // Act
      project.removeTodo(id1);
      project.removeTodo(id2);
      // Assert
      expect(project.todos.length).toBe(0);
      expect(project.todos).not.toContain(todo1);
      expect(project.todos).not.toContain(todo2);
    });

    test("removes the correct todo from the todos array", () => {
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
      project.addTodo(todo1);
      project.addTodo(todo2);
      const id1 = todo1.id;
      // Act
      project.removeTodo(id1);
      // Assert
      expect(project.todos.length).toBe(1);
      expect(project.todos).not.toContain(todo1);
      expect(project.todos).toContain(todo2);
    });

    test("throws an error if todo array is empty", () => {
      // Arrange
      const todo = new Todo(
        "Buy groceries",
        "Remember to buy milk, eggs, and vegetables.",
        "2023-08-31",
        "High"
      );
      const id = todo.id;
      // Act & Assert
      expect(() => {
        project.removeTodo(id);
      }).toThrow("Todo not found.");
    });
  });

  describe("filterTodosByCompleteness", () => {
    test("filters completed todos correctly", () => {
      // Arrange
      const todo1 = new Todo("Todo 1", "Description", "2023-08-31", "High");
      const todo2 = new Todo("Todo 2", "Description", "2023-08-31", "Medium");
      const todo3 = new Todo("Todo 3", "Description", "2023-08-31", "Low");
      todo1.toggleComplete(); // Mark todo1 as completed
      project.addTodo(todo1);
      project.addTodo(todo2);
      project.addTodo(todo3);

      // Act
      const completedTodos = project.filterTodosByCompleteStatus(true);

      // Assert
      expect(completedTodos).toContain(todo1);
      expect(completedTodos).not.toContain(todo2);
      expect(completedTodos).not.toContain(todo3);
    });

    test("filters incomplete todos correctly", () => {
      // Arrange
      const todo1 = new Todo("Todo 1", "Description", "2023-08-31", "High");
      const todo2 = new Todo("Todo 2", "Description", "2023-08-31", "Medium");
      const todo3 = new Todo("Todo 3", "Description", "2023-08-31", "Low");
      todo2.toggleComplete(); // Mark todo2 as completed
      project.addTodo(todo1);
      project.addTodo(todo2);
      project.addTodo(todo3);

      // Act
      const incompleteTodos = project.filterTodosByCompleteStatus(false);

      // Assert
      expect(incompleteTodos).toContain(todo1);
      expect(incompleteTodos).not.toContain(todo2);
      expect(incompleteTodos).toContain(todo3);
    });
  });

  describe("filterTodosByPriority", () => {
    test("filters todos by priority correctly", () => {
      // Arrange
      const todo1 = new Todo("Todo 1", "Description", "2023-08-31", "High");
      const todo2 = new Todo("Todo 2", "Description", "2023-08-31", "Medium");
      const todo3 = new Todo("Todo 3", "Description", "2023-08-31", "Low");
      project.addTodo(todo1);
      project.addTodo(todo2);
      project.addTodo(todo3);

      // Act
      const highPriorityTodos = project.filterTodosByPriority("High");
      const mediumPriorityTodos = project.filterTodosByPriority("Medium");
      const lowPriorityTodos = project.filterTodosByPriority("Low");

      // Assert
      expect(highPriorityTodos).toContain(todo1);
      expect(highPriorityTodos).not.toContain(todo2);
      expect(highPriorityTodos).not.toContain(todo3);
      expect(mediumPriorityTodos).not.toContain(todo1);
      expect(mediumPriorityTodos).toContain(todo2);
      expect(mediumPriorityTodos).not.toContain(todo3);
      expect(lowPriorityTodos).not.toContain(todo1);
      expect(lowPriorityTodos).not.toContain(todo2);
      expect(lowPriorityTodos).toContain(todo3);
    });
  });
});
