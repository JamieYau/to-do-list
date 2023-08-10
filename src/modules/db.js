import Dexie from "dexie";
import Project from "./project";
import Todo from "./todo";
import { generateProjects, generateTodos } from "./utils";

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

const convertProjectsDataToModels = async (projectsData) => {
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
};

export { db as default, insertTestData, convertProjectsDataToModels };
