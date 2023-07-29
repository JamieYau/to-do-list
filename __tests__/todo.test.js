import Todo from "../src/modules/todo.js";

// Common test data
const title = "Buy groceries";
const description = "Remember to buy milk and eggs.";
const dueDate = "2023-07-31";
const priority = "High";

let todo;

beforeEach(() => {
  todo = new Todo(title, description, dueDate, priority);
});

test("Todo constructor sets properties correctly", () => {
  // Assert
  expect(todo.title).toBe(title);
  expect(todo.description).toBe(description);
  expect(todo.dueDate).toBe(dueDate);
  expect(todo.priority).toBe(priority);
});

test("Todo setTitle method updates the title correctly", () => {
  // Arrange
  const newTitle = "Buy vegetables";

  // Act
  todo.setTitle(newTitle);

  // Assert
  expect(todo.title).toBe(newTitle);
});

test("Todo setDescription method updates the description correctly", () => {
  // Arrange
  const newDescription = "Remember to buy milk, eggs, and vegetables.";

  // Act
  todo.setDescription(newDescription);

  // Assert
  expect(todo.description).toBe(newDescription);
});
