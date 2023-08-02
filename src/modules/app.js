import Project from "./project.js";
import Todo from "./todo.js";
import { renderPage, renderProjects, renderTodos } from "./render.js";

const initApp = () => {
  renderPage();

  // Generate test data
  const projects = generateProject();
  generateTodos(projects);
  renderProjects(projects);
  renderTodos(projects[0]);
};

//Function to create 5 Project objects and add to projects array
const generateProject = () => {
  const projects = [];
  const project1 = new Project("Project 1");
  projects.push(project1);
  const project2 = new Project("Project 2");
  projects.push(project2);
  const project3 = new Project("Project 3");
  projects.push(project3);
  const project4 = new Project("Project 4");
  projects.push(project4);
  const project5 = new Project("Project 5");
  projects.push(project5);
  return projects;
};

// Function to create 5 Todos per project and add to each project
const generateTodos = (projects) => {
  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < 5; j++) {
      const todo = new Todo(
        `Todo ${j}`,
        `This is todo ${j} for project ${i}.`,
        new Date("2023-08-12"),
        "High",
        false
      );
      projects[i].addTodo(todo);
    }
  }
};

export default initApp;
