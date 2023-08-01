import Project from "./project.js";
import Todo from "./todo.js";
import { renderProjects, renderTodos } from "./render.js";

const initApp = () => {
    const projects = [];
    const defaultProject = new Project("Default");
    projects.push(defaultProject);
    const defaultTodo = new Todo(
        "Default Todo",
        "This is a default todo.",
        new Date("2023-08-12"),
        "High",
        false
    );
    defaultProject.addTodo(defaultTodo);
    renderProjects(projects);
    renderTodos(defaultProject.todos);
};

export default initApp;
