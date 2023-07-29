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
