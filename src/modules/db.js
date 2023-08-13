import Dexie from "dexie";
import { generateProjects } from "./utils";

const db = new Dexie("TodoAppDatabase");

db.version(3).stores({
  projects: "id, title",
  todos: "id, projectId, title, description, dueDate, priority, isComplete",
});

const insertTestData = async () => {
  await db.projects.clear();
  await db.todos.clear();
  // Generate test projects + todos
  const projects = generateProjects();

  // Insert projects and todos
  for (const project of projects) {
    await db.projects.put({ id: project.id, title: project.title });
    for (const todo of project.todos) {
      await db.todos.put({
        id: todo.id,
        projectId: todo.projectId,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isComplete: todo.isComplete,
      });
    }
  }
};

export { db as default, insertTestData };
