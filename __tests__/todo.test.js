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
  });

  describe("setTitle", () => {
    test("updates the title correctly", () => {
      // Arrange
      const newTitle = "Buy vegetables";
      // Act
      todo.setTitle(newTitle);
      // Assert
      expect(todo.title).toBe(newTitle);
    });
  });

  describe("setDescription", () => {
    test("updates the description correctly", () => {
      // Arrange
      const newDescription = "Remember to buy milk, eggs, and vegetables.";
      // Act
      todo.setDescription(newDescription);
      // Assert
      expect(todo.description).toBe(newDescription);
    });
  });

  describe("setDueDate", () => {
    test("updates the due date correctly", () => {
      // Arrange
      const newDueDate = new Date("2023-08-31");
      // Act
      todo.setDueDate(newDueDate);
      // Assert
      expect(todo.dueDate).toBe(newDueDate);
    });

    test("throws an error if the due date is not a valid Date object", () => {
      // Arrange
      const invalidDueDate = "2023-08-31"; // Not a Date object

      // Act & Assert
      expect(() => {
        todo.setDueDate(invalidDueDate);
      }).toThrow("Due date must be a valid Date object.");
    });

    test("throws an error if the due date is in the past", () => {
      // Arrange
      const pastDueDate = new Date("2020-01-01");

      // Act & Assert
      expect(() => {
        todo.setDueDate(pastDueDate);
      }).toThrow("Due date must be in the present or future.");
    });
  });

  describe("setPriority", () => {
    test("updates the priority correctly", () => {
      // Arrange
      const newPriority = "Low";
      // Act
      todo.setPriority(newPriority);
      // Assert
      expect(todo.priority).toBe(newPriority);
    });

    test("throws an error if the priority is not valid", () => {
      // Arrange
      const newPriority = "Invalid";
      // Act & Assert
      expect(() => {
        todo.setPriority(newPriority);
      }).toThrow("Priority must be either High, Medium, or Low.");
    });

    test("Todo setPriority method throws error for empty priority", () => {
      // Arrange & Act & Assert
      expect(() => {
        todo.setPriority("");
      }).toThrow("Priority must be either High, Medium, or Low.");
    });

    test("Todo setPriority method throws error for null priority", () => {
      // Arrange & Act & Assert
      expect(() => {
        todo.setPriority(null);
      }).toThrow("Priority must be either High, Medium, or Low.");
    });

    test("Todo setPriority method throws error for undefined priority", () => {
      // Arrange & Act & Assert
      expect(() => {
        todo.setPriority(undefined);
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
