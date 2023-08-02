import Project from "./project.js";
import Todo from "./todo.js";
import { renderPage, renderProjects, renderTodos } from "./render.js";

const initApp = () => {
  renderPage();

  // Generate test data
  const projects = generateProjects();
  generateTodos(projects, 5);
  renderProjects(projects);
  renderTodos(projects[0]);

  // Add event listeners
  addSidebarListeners(projects);
};

// Attach event listeners to project list items
const addSidebarListeners = (projects) => {
  const projectListItems = document.querySelectorAll(".project-list-item");
  projectListItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Get the project ID from the dataset attribute
      const projectId = item.dataset.id;
      // Find the corresponding project object from the projects array
      const selectedProject = projects.find(
        (project) => project.id === projectId
      );
      // Render the todos of the selected project
      renderTodos(selectedProject);
      // You can also update the project name in the content section if needed
      const projectNameElement = document.getElementById("project-name");
      projectNameElement.textContent = selectedProject.title;
    });
    // add hover class
    item.addEventListener("mouseenter", () => {
      item.classList.add("hover");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover");
    });
  });
};

//Function to create 5 Project objects and add to projects array
const generateProjects = () => {
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

const generateRandomTodo = () => {
  // Array of different todo titles
  const titles = [
    "Buy groceries",
    "Walk the dog",
    "Finish homework",
    "Call friend",
    "Clean the house",
  ];
  // Array of different todo descriptions
  const descriptions = [
    "Remember to buy milk and eggs",
    "Take the dog for a walk in the park",
    "Complete math assignment",
    "Catch up with a friend",
    "Vacuum and mop all rooms",
  ];
  // Array of different todo priorities
  const priorities = ["High", "Medium", "Low"];

  // Randomly select values for the todo
  const title = titles[Math.floor(Math.random() * titles.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const dueDate = new Date(
    Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  ); // Random due date within the next 30 days
  const priority = priorities[Math.floor(Math.random() * priorities.length)];

  return new Todo(title, description, dueDate, priority);
};

const generateTodos = (projects, numberOfTodos) => {
  projects.forEach((project) => {
    for (let i = 0; i < numberOfTodos; i++) {
      const todo = generateRandomTodo();
      project.addTodo(todo);
    }
  });
  console.log(projects);
};

export default initApp;
