import {
  hideModal,
  setActiveProject,
  removeActiveTodo,
  renderPage,
  renderProjects,
  renderAddProject,
  renderAddTodo,
  renderTodos,
  renderTodoDetails,
  renderEditTodo,
  renderConfirmationModal,
} from "./render.js";
import db, { insertTestData } from "./db.js";
import dataService from "./dataService.js";

const initApp = async () => {
  renderPage();

  // Insert test data into the database
  await insertTestData();
  const projects = await dataService.getAllProjectsAndTodos();

  renderProjects(projects);
  renderTodos(projects[0]);

  // Add event listeners
  sidebarListeners(projects);
  addTodoListener(projects);
  todoListeners(projects[0]);
  modalListeners();
};

// Sidebar Event Listeners
const sidebarListeners = (projects) => {
  const projectListItems = document.querySelectorAll(".project-list-item");
  // Hover Project
  const handleProjectHover = (item) => {
    const deleteBtn = item.querySelector(".delete-project");
    deleteBtn.classList.toggle("hidden");
  };

  projectListItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      handleProjectHover(item);
    });
    item.addEventListener("mouseout", () => {
      handleProjectHover(item);
    });
  });
  // Project Click
  const handleProjectItemClick = (projectId) => {
    projectListItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.id === projectId);
    });
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );
    renderTodos(selectedProject);
    todoListeners(selectedProject);
  };
  projectListItems.forEach((item) => {
    const projectId = item.dataset.id;
    item.addEventListener("click", () => {
      handleProjectItemClick(projectId);
    });
  });
  // Delete Project
  const deleteProjectBtns = document.querySelectorAll(".delete-project");
  const handleDeleteProject = async (event, projectId) => {
    event.preventDefault();
    try {
      await dataService.deleteProject(projectId);
      const projects = await dataService.getAllProjectsAndTodos();
      renderProjects(projects);
      sidebarListeners(projects);
      renderTodos(projects[0]);
      todoListeners(projects[0]);
      hideModal("confirmation-modal");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  deleteProjectBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const projectId = event.target.closest(".project-list-item").dataset.id;
      const selectedProject = projects.find(
        (project) => project.id === projectId
      );
      renderConfirmationModal(selectedProject);
      // Confirm Delete Project
      const confirmBtn = document.getElementById("confirm-delete");
      confirmBtn.addEventListener("click", (event) => {
        handleDeleteProject(event, projectId);
      });
      // Cancel Delete Project
      const cancelBtn = document.getElementById("cancel-delete");
      cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        hideModal("confirmation-modal");
      });
    });
  });
  // Add Project Btn
  const addProjectBtn = document.getElementById("add-project");
  addProjectBtn.addEventListener("click", () => {
    renderAddProject();
    // Submit Add Project
    const form = document.getElementById("add-project-form");
    form.addEventListener("submit", (event) => {
      handleCreateProject(event, projects);
    });
    // Cancel Add Project
    const cancelBtn = document.getElementById("cancel-create");
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      hideModal("project-modal");
    });
  });

  const handleCreateProject = async (event, projects) => {
    event.preventDefault();
    const title = document.getElementById("project-title").value;

    try {
      const newProject = await dataService.createProject(title);

      projects.push(newProject);
      hideModal("project-modal");
      renderProjects(projects);
      sidebarListeners(projects);
      renderTodos(newProject);
      todoListeners(newProject);
      setActiveProject(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
};

// Add Todo Btn Listener
const addTodoListener = (projects) => {
  const addTodoBtn = document.getElementById("add-todo");

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-duedate").value;
    const priority = document.getElementById("todo-priority").value;
    const projectId = document.getElementById("todo-project").value;
    const project = projects.find((project) => project.id === projectId);
    try {
      // Call the createTodo function from dataService
      project.addTodo(
        await dataService.createTodo(
          projectId,
          title,
          description,
          dueDate,
          priority
        )
      );
      // Update UI and hide modal
      renderTodos(project);
      todoListeners(project);
      hideModal("todo-modal");
      setActiveProject(project);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  addTodoBtn.addEventListener("click", () => {
    renderAddTodo(projects);
    // Add Todo Form
    const form = document.getElementById("add-todo-form");
    form.addEventListener("submit", (event) => {
      handleCreateTodo(event);
    });
    // Cancel Add Todo
    const cancelBtn = document.getElementById("cancel-create");
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      hideModal("todo-modal");
    });
  });
};

// Todo List items listeners
const todoListeners = (project) => {
  const todoListItems = document.querySelectorAll(".todo-item");

  const handleTodoItemClick = (todoId) => {
    todoListItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.id === todoId);
    });
    const selectedTodo = project.todos.find((todo) => todo.id === todoId);
    renderTodoDetails(selectedTodo);
    todoDetailsListener(selectedTodo, project);
  };

  const handleCheckboxClick = async (event, todoId) => {
    event.stopPropagation();
    await dataService.toggleTodoComplete(todoId);
    const selectedTodo = project.todos.find((todo) => todo.id === todoId);
    selectedTodo.toggleComplete();
    event.target.checked = selectedTodo.isComplete;
  };

  todoListItems.forEach((item) => {
    const todoId = item.dataset.id;
    item.addEventListener("click", () => {
      handleTodoItemClick(todoId);
    });
    // Checkbox
    const checkbox = item.querySelector(".is-complete");
    checkbox.addEventListener("click", (event) => {
      handleCheckboxClick(event, todoId);
    });
    // Edit Button
    const editButton = item.querySelector(".edit-todo");
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedTodo = project.todos.find((todo) => todo.id === todoId);
      renderEditTodo(selectedTodo);
      saveTodoListener(selectedTodo, project);
      cancelEditListener(selectedTodo, project);
    });
    // Delete Button
    const deleteButton = item.querySelector(".delete-todo");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedTodo = project.todos.find((todo) => todo.id === todoId);
      renderConfirmationModal(selectedTodo);
      cancelDeleteListener();
      confirmDeleteTodoListener(selectedTodo, project);
    });
  });
};

// Todo Details Modal Listeners
const todoDetailsListener = (selectedTodo, project) => {
  // Edit todo
  const editBtn = document.getElementById("edit-todo");
  editBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    renderEditTodo(selectedTodo);
    saveTodoListener(selectedTodo, project);
    cancelEditListener(selectedTodo, project);
  });

  // Delete todo
  const deleteBtn = document.getElementById("delete-todo");
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    renderConfirmationModal(selectedTodo);
    cancelDeleteListener();
    confirmDeleteTodoListener(selectedTodo, project);
  });
};

const saveTodoListener = (selectedTodo, project) => {
  const form = document.getElementById("edit-todo-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-duedate").value;
    const priority = document.getElementById("todo-priority").value;
    await dataService.updateTodo(
      selectedTodo.id,
      title,
      description,
      dueDate,
      priority
    );
    selectedTodo.title = title;
    selectedTodo.description = description;
    selectedTodo.dueDate = new Date(dueDate);
    selectedTodo.priority = priority;
    renderTodoDetails(selectedTodo);
    todoDetailsListener(selectedTodo, project);
    renderTodos(project);
    todoListeners(project);
  });
};

const cancelEditListener = (selectedTodo, project) => {
  const cancelBtn = document.getElementById("cancel-edit");
  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    renderTodoDetails(selectedTodo);
    todoDetailsListener(selectedTodo, project);
  });
};

const cancelDeleteListener = () => {
  const cancelBtn = document.getElementById("cancel-delete");
  cancelBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    hideModal("confirmation-modal");
    removeActiveTodo();
  });
};

const confirmDeleteTodoListener = (selectedTodo, project) => {
  const confirmBtn = document.getElementById("confirm-delete");
  confirmBtn.addEventListener("click", async (event) => {
    event.stopPropagation();
    await dataService.deleteTodo(selectedTodo.id);
    project.removeTodo(selectedTodo.id);
    renderTodos(project);
    todoListeners(project);
    hideModal("confirmation-modal");
    removeActiveTodo();
  });
};

const modalListeners = () => {
  const closeModal = () => {
    hideModal("project-modal");
    hideModal("todo-modal");
    hideModal("confirmation-modal");
    removeActiveTodo();
  };
  const modalCloseBtns = document.querySelectorAll(".close-btn");
  modalCloseBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeModal();
    });
  });
  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", () => {
    closeModal();
  });
  // Prevent modal from closing when clicking inside modal
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
};

export default initApp;
