import db from "./db";
import Project from "./project";
import Todo from "./todo";

const dataService = {
  convertProjectsDataToModels: async (projectsData) => {
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
          todoData.priority,
          project.id
        );
        todo.id = todoData.id;
        todo.isComplete = todoData.isComplete;
        project.addTodo(todo);
      }
    }

    return Array.from(projectsMap.values());
  },

  createProject: async (title) => {
    const newProject = new Project(title);
    await db.projects.add(newProject);
    return newProject;
  },

  createTodo: async (projectId, title, description, dueDate, priority) => {
    const newTodo = new Todo(title, description, dueDate, priority, projectId);
    await db.todos.add(newTodo);
    return newTodo;
  },

  // Implement other CRUD functions like updateProject, updateTodo, deleteProject, deleteTodo, etc.
};

export default dataService;
