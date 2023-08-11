import db from "./db";
import Project from "./project";
import Todo from "./todo";

const dataService = {
  convertProjectToModel: async (projectData) => {
    const project = new Project(projectData.title);
    project.id = projectData.id;

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

    return project;
  },

  convertProjectsDataToModels: async (projectsData) => {
    const projectsMap = new Map();

    for (const projectData of projectsData) {
      const project = await dataService.convertProjectToModel(projectData);
      projectsMap.set(project.id, project);
    }

    return Array.from(projectsMap.values());
  },

  convertProjectToDbFormat: (project) => {
    return {
      id: project.id,
      title: project.title,
    };
  },

  convertTodoToDbFormat: (todo) => {
    return {
      id: todo.id,
      projectId: todo.projectId,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
      isComplete: todo.isComplete,
    };
  },

  getAllProjectsAndTodos: async () => {
    const projectsData = await db.projects.toArray();
    return dataService.convertProjectsDataToModels(projectsData);
  },

  createProject: async (title) => {
    const newProject = new Project(title);
    const dbProject = dataService.convertProjectToDbFormat(newProject);
    await db.projects.add(dbProject);
    return newProject;
  },

  getProject: async (id) => {
    const dbProject = await db.projects.get(id);
    return dataService.convertProjectToModel(dbProject);
  },

  createTodo: async (projectId, title, description, dueDate, priority) => {
    const newTodo = new Todo(title, description, dueDate, priority, projectId);
    const dbTodo = dataService.convertTodoToDbFormat(newTodo);

    await db.todos.add(dbTodo);

    return newTodo;
  },

  // Implement other CRUD functions like updateProject, updateTodo, deleteProject, deleteTodo, etc.
};

export default dataService;
