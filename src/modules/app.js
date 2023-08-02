import Project from "./project.js";
import Todo from "./todo.js";
import { renderPage, renderProjects, renderTodos } from "./render.js";
import { generateProjects, generateTodos } from "./utils.js";

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
      // Remove the active class from all project list items + Add to current
      projectListItems.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      // Get the project ID from the dataset attribute
      const projectId = item.dataset.id;
      // Find the corresponding project object from the projects array
      const selectedProject = projects.find(
        (project) => project.id === projectId
      );
      // Render the todos of the selected project
      renderTodos(selectedProject);
    });
    // Add + Remove hover class
    item.addEventListener("mouseenter", () => {
      item.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover");
    });
  });
};

export default initApp;
