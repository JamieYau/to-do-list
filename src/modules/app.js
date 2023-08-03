import Project from "./project.js";
import Todo from "./todo.js";
import {
  renderPage,
  renderProjects,
  renderTodos,
  renderTodoDetails,
  renderEditTodo,
} from "./render.js";
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
  addTodoListeners(projects[0]);
  addModalListeners();
};

const addSidebarListeners = (projects) => {
  const projectListItems = document.querySelectorAll(".project-list-item");
  const handleProjectItemClick = (projectId) => {
    projectListItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.id === projectId);
    });
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );
    renderTodos(selectedProject);
    addTodoListeners(selectedProject);
  };
  projectListItems.forEach((item) => {
    const projectId = item.dataset.id;
    item.addEventListener("click", () => {
      handleProjectItemClick(projectId);
    });
    item.addEventListener("mouseenter", () => {
      item.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover");
    });
  });
};

const addTodoListeners = (project) => {
  const todoListItems = document.querySelectorAll(".todo-item");

  const handleTodoItemClick = (todoId) => {
    todoListItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.id === todoId);
    });
    const selectedTodo = project.todos.find((todo) => todo.id === todoId);
    renderTodoDetails(selectedTodo);
    addTodoDetailsListeners(selectedTodo, project);
  };

  const handleCheckboxClick = (event, todoId) => {
    event.stopPropagation();
    const selectedTodo = project.todos.find((todo) => todo.id === todoId);
    selectedTodo.toggleComplete();
    event.target.checked = selectedTodo.isComplete;
  };

  todoListItems.forEach((item) => {
    const todoId = item.dataset.id;
    item.addEventListener("click", () => {
      handleTodoItemClick(todoId);
    });
    item.addEventListener("mouseenter", () => {
      item.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover");
    });
    const checkbox = item.querySelector(".is-complete");
    const editButton = item.querySelector(".edit-todo");
    const deleteButton = item.querySelector(".delete-todo");
    checkbox.addEventListener("click", (event) => {
      handleCheckboxClick(event, todoId);
    });
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedTodo = project.todos.find((todo) => todo.id === todoId);
      renderEditTodo(selectedTodo);
      addSaveTodoListener(selectedTodo, project);
      addCancelEditListener(selectedTodo, project);
    });
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
};

const addTodoDetailsListeners = (selectedTodo, project) => {
  // Edit todo
  const editBtn = document.getElementById("edit-todo");
  editBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    renderEditTodo(selectedTodo);
    addSaveTodoListener(selectedTodo, project);
    addCancelEditListener(selectedTodo, project);
  });

  // Add other event listeners for the todo details here, if needed.
};

const addSaveTodoListener = (selectedTodo, project) => {
  const saveBtn = document.getElementById("save-edit");
  saveBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-duedate").value;
    const priority = document.getElementById("todo-priority").value;
    selectedTodo.title = title;
    selectedTodo.description = description;
    selectedTodo.dueDate = new Date(dueDate);
    selectedTodo.priority = priority;
    renderTodoDetails(selectedTodo);
    addTodoDetailsListeners(selectedTodo, project);
    renderTodos(project);
    addTodoListeners(project);
  });
};

const addCancelEditListener = (selectedTodo, project) => {
  const cancelBtn = document.getElementById("cancel-edit");
  cancelBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    renderTodoDetails(selectedTodo);
    addTodoDetailsListeners(selectedTodo, project);
  });
};

const addModalListeners = () => {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  // Close modal and Remove active class from todo
  const modalClose = document.getElementById("close-btn");
  const closeModal = () => {
    overlay.classList.add("hidden");
    const todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => {
      todo.classList.remove("active");
    });
  };
  modalClose.addEventListener("click", () => {
    closeModal();
  });
  overlay.addEventListener("click", () => {
    closeModal();
  });
  // Prevent modal from closing when clicking inside modal
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

export default initApp;
