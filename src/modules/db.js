import Dexie from "dexie";
import Project from "./project";
import Todo from "./todo";

const db = new Dexie("TodoAppDatabase");

db.version(3).stores({
  projects: "id, title",
  todos: "id, projectId, title, description, dueDate, priority, isComplete",
});

const insertTestData = async () => {
  await db.projects.clear();
  await db.todos.clear();
  const testProject1 = new Project("Test Project 1");
  const testProject2 = new Project("Test Project 2");

  const todo1 = new Todo(
    "Test Todo 1 for Project 1",
    "This is a test todo for Project 1.",
    new Date(),
    "High"
  );
  const todo2 = new Todo(
    "Test Todo 2 for Project 2",
    "This is a test todo for Project 2.",
    new Date(),
    "Medium"
  );

  // Assign todos to projects
  testProject1.addTodo(todo1);
  testProject2.addTodo(todo2);

  // Insert projects and todos
  await db.projects.bulkPut([
    { id: testProject1.id, title: testProject1.title },
    { id: testProject2.id, title: testProject2.title },
  ]);

  await db.todos.bulkPut([
    {
      id: todo1.id,
      projectId: testProject1.id,
      title: todo1.title,
      description: todo1.description,
      dueDate: todo1.dueDate,
      priority: todo1.priority,
      isComplete: todo1.isComplete,
    },
    {
      id: todo2.id,
      projectId: testProject2.id,
      title: todo2.title,
      description: todo2.description,
      dueDate: todo2.dueDate,
      priority: todo2.priority,
      isComplete: todo2.isComplete,
    },
  ]);
};

const convertProjectsDataToModels = async(projectsData) => {
  const projectsMap = new Map();

  for (const projectData of projectsData) {
    const project = new Project(projectData.title);
    project.id = projectData.id;
    projectsMap.set(project.id, project);

    const todosData = await db.todos
      .where("projectId")
      .equals(project.id)
      .toArray();

    for (const todoData of todosData) {
      const todo = new Todo(
        todoData.title,
        todoData.description,
        new Date(todoData.dueDate),
        todoData.priority
      );
      todo.id = todoData.id;
      todo.isComplete = todoData.isComplete;
      project.addTodo(todo);
    }
  }

  return Array.from(projectsMap.values());
}

export { db as default, insertTestData, convertProjectsDataToModels };
