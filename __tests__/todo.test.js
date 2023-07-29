import Todo from "../src/modules/todo.js";

test("Todo constructor sets properties correctly", () => {
  // Arrange
  const title = "Buy groceries";
  const description = "Remember to buy milk and eggs.";
  const dueDate = "2023-07-31";
  const priority = "High";

  // Act
  const todo = new Todo(title, description, dueDate, priority);

  // Assert
  expect(todo.title).toBe(title);
  expect(todo.description).toBe(description);
  expect(todo.dueDate).toBe(dueDate);
  expect(todo.priority).toBe(priority);
});

test("Todo setTitle method updates the title correctly", () => {
  // Arrange
  const title = "Buy groceries";
  const description = "Remember to buy milk and eggs.";
  const dueDate = "2023-07-31";
  const priority = "High";
  const todo = new Todo(title, description, dueDate, priority);

  // Act
  const newTitle = "Buy vegetables";
  todo.setTitle(newTitle);

  // Assert
  expect(todo.title).toBe(newTitle);
});

test("Todo setDescription method updates the description correctly", () => {
  // Arrange
  const title = "Buy groceries";
  const description = "Remember to buy milk and eggs.";
  const dueDate = "2023-07-31";
  const priority = "High";
  const todo = new Todo(title, description, dueDate, priority);

  // Act
  const newDescription = "Remember to buy milk, eggs, and vegetables.";
  todo.setDescription(newDescription);

  // Assert
  expect(todo.description).toBe(newDescription);
});
