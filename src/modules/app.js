import Project from "./project.js";
import Todo from "./todo.js";
import {
  renderPage,
  renderProjects,
  renderAddProject,
  renderAddTodo,
  renderTodos,
  renderTodoDetails,
  renderEditTodo,
  renderConfirmationModal,
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
  addAddTodoListener(projects);
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
  const addProjectBtn = document.getElementById("add-project");
  addProjectBtn.addEventListener("click", () => {
    renderAddProject();
    addCreateProject(projects);
    addCancelCreateProject();
  });

  const addCreateProject = (projects) => {
    const form = document.getElementById("add-project-form");
    form.addEventListener("submit", (event) => {
      event.stopPropagation();
      const title = document.getElementById("project-title").value;
      const newProject = new Project(title);
      projects.push(newProject);
      renderProjects(projects);
      const overlay = document.getElementById("overlay");
      const modal = document.getElementById("project-modal");
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    });
  };

  const addCancelCreateProject = () => {
    const cancelBtn = document.getElementById("cancel-create");
    cancelBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const overlay = document.getElementById("overlay");
      const modal = document.getElementById("project-modal");
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    });
  };
};

const addAddTodoListener = (projects) => {
  const addTodoBtn = document.getElementById("add-todo");
  addTodoBtn.addEventListener("click", () => {
    renderAddTodo(projects);
    addCreateTodo(projects);
    addCancelCreateTodo();
  });
};

const addCreateTodo = (projects) => {
  const form = document.getElementById("add-todo-form");
  form.addEventListener("submit", (event) => {
    event.stopPropagation();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-duedate").value;
    const priority = document.getElementById("todo-priority").value;
    const projectId = document.getElementById("todo-project").value;
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );
    const newTodo = new Todo(title, description, new Date(dueDate), priority);
    selectedProject.addTodo(newTodo);
    renderTodos(selectedProject);
    addTodoListeners(selectedProject);
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("todo-modal");
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  });
};

const addCancelCreateTodo = () => {
  const cancelBtn = document.getElementById("cancel-create");
  cancelBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("todo-modal");
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  });
};

// Add event listeners for todo list items
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
      const selectedTodo = project.todos.find((todo) => todo.id === todoId);
      renderConfirmationModal(selectedTodo);
      addCancelDeleteListener();
      addConfirmDeleteTodoListener(selectedTodo, project);
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

  // Delete todo
  const deleteBtn = document.getElementById("delete-todo");
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    renderConfirmationModal(selectedTodo);
    addCancelDeleteListener();
    addConfirmDeleteTodoListener(selectedTodo, project);
  });
};

const addSaveTodoListener = (selectedTodo, project) => {
  const form = document.getElementById("edit-todo-form");
  form.addEventListener("submit", (event) => {
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

const addCancelDeleteListener = () => {
  const cancelBtn = document.getElementById("cancel-delete");
  cancelBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("confirmation-modal");
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    const todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => {
      todo.classList.remove("active");
    });
  });
};

const addConfirmDeleteTodoListener = (selectedTodo, project) => {
  const confirmBtn = document.getElementById("confirm-delete");
  confirmBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    project.removeTodo(selectedTodo.id);
    renderTodos(project);
    addTodoListeners(project);
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("confirmation-modal");
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    const todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => {
      todo.classList.remove("active");
    });
  });
};

const addModalListeners = () => {
  const overlay = document.getElementById("overlay");
  const modals = document.querySelectorAll(".modal");
  // Close modal and Remove active class from todo
  const modalCloseBtns = document.querySelectorAll(".close-btn");
  const closeModal = () => {
    overlay.classList.add("hidden");
    modals.forEach((modal) => {
      modal.classList.add("hidden");
    });
    const todos = document.querySelectorAll(".todo-item");
    todos.forEach((todo) => {
      todo.classList.remove("active");
    });
  };
  modalCloseBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeModal();
    });
  });
  overlay.addEventListener("click", () => {
    closeModal();
  });
  // Prevent modal from closing when clicking inside modal
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
};

export default initApp;
