import Todo from "../src/modules/todo.js";

describe("Todo", () => {
  // Common test data
  const title = "Buy groceries";
  const description = "Remember to buy milk and eggs.";
  const dueDate = new Date("2023-07-31");
  const priority = "High";
  let todo;

  beforeEach(() => {
    todo = new Todo(title, description, dueDate, priority);
  });

  test("constructor sets properties correctly", () => {
    // Assert
    expect(todo.title).toBe(title);
    expect(todo.description).toBe(description);
    expect(todo.dueDate).toBe(dueDate);
    expect(todo.priority).toBe(priority);
    expect(todo.isComplete).toBe(false);
    expect(todo.id).toBeDefined();
  });

  test("constructor generates unique IDs", () => {
    // Arrange
    const todos = [];

    // Act & Assert
    for (let i = 0; i < 1000; i++) {
      const todo = new Todo(
        `Title ${i}`,
        `Description ${i}`,
        new Date("2023-08-31"),
        `High`
      );
      todos.push(todo);
    }

    // Check for uniqueness
    const idsSet = new Set(todos.map((todo) => todo.id));
    expect(idsSet.size).toBe(todos.length);
  });

  describe("setTitle", () => {
    test("updates the title correctly", () => {
      // Arrange
      const newTitle = "Buy vegetables";
      // Act
      todo.title = newTitle;
      // Assert
      expect(todo.title).toBe(newTitle);
    });

    test("throws an error if the title is empty", () => {
      // Act & Assert
      expect(() => {
        todo.title = "";
      }).toThrow("Title cannot be empty.");
    });
  });

  describe("setDescription", () => {
    test("updates the description correctly", () => {
      // Arrange
      const newDescription = "Remember to buy milk, eggs, and vegetables.";
      // Act
      todo.description = newDescription;
      // Assert
      expect(todo.description).toBe(newDescription);
    });
  });

  describe("setDueDate", () => {
    test("updates the due date correctly", () => {
      // Arrange
      const newDueDate = new Date("2023-08-31");
      // Act
      todo.dueDate = newDueDate;
      // Assert
      expect(todo.dueDate).toBe(newDueDate);
    });

    test("throws an error if the due date is not a valid Date object", () => {
      // Act & Assert
      expect(() => {
        todo.dueDate = "2023-08-31"; // Not a Date object
      }).toThrow("Due date must be a valid Date object.");
    });

    test("throws an error if the due date is in the past", () => {
      // Act & Assert
      expect(() => {
        todo.dueDate = new Date("2020-01-01");
      }).toThrow("Due date must be in the present or future.");
    });

    test("Todo setDueDate method throws error for empty due date", () => {
      // Act & Assert
      expect(() => {
        todo.dueDate = "";
      }).toThrow("Due date must be a valid Date object.");
    });
  });

  describe("setPriority", () => {
    test("updates the priority correctly", () => {
      // Arrange
      const newPriority = "Low";
      // Act
      todo.priority = newPriority;
      // Assert
      expect(todo.priority).toBe(newPriority);
    });

    test("throws an error if the priority is not valid", () => {
      // Act & Assert
      expect(() => {
        todo.priority = "Invalid";
      }).toThrow("Priority must be either High, Medium, or Low.");
    });

    test("Todo setPriority method throws error for empty priority", () => {
      // Act & Assert
      expect(() => {
        todo.priority = "";
      }).toThrow("Priority must be either High, Medium, or Low.");
    });

    test("Todo setPriority method throws error for null priority", () => {
      // Act & Assert
      expect(() => {
        todo.priority = null;
      }).toThrow("Priority must be either High, Medium, or Low.");
    });

    test("Todo setPriority method throws error for undefined priority", () => {
      // Act & Assert
      expect(() => {
        todo.priority = undefined;
      }).toThrow("Priority must be either High, Medium, or Low.");
    });
  });

  describe("toggleComplete", () => {
    test("toggles the isComplete property correctly", () => {
      // Arrange
      const expected = true;
      // Act & Assert
      todo.toggleComplete();
      expect(todo.isComplete).toBe(expected);

      todo.toggleComplete();
      expect(todo.isComplete).toBe(!expected);
    });
  });
});
