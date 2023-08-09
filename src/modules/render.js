import Project from "./project";
import Todo from "./todo";

const getElement = (id) => document.getElementById(id);

const showModal = (modalId) => {
  getElement("overlay").classList.remove("hidden");
  getElement(modalId).classList.remove("hidden");
};

const hideModal = (modalId) => {
  getElement("overlay").classList.add("hidden");
  getElement(modalId).classList.add("hidden");
};

// Helper function to create a button
const createButton = (id, classes, text, iconClasses) => {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add(...classes);

  if (iconClasses) {
    const icon = document.createElement("i");
    icon.classList.add(...iconClasses);
    button.appendChild(icon);
  }

  if (text) {
    const textElement = document.createElement("span");
    textElement.textContent = text;
    button.appendChild(textElement);
  }

  return button;
};

const renderPage = () => {
  const container = document.getElementById("container");
  container.innerHTML = "";
  // Render Modal
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("hidden");
  container.appendChild(overlay);
  renderModal("todo");
  renderModal("project");
  renderModal("confirmation");
  // Render the header
  const header = document.createElement("header");
  header.id = "page-header";
  const headerTitle = document.createElement("h1");
  headerTitle.id = "header-title";
  headerTitle.textContent = "Todo List";
  header.appendChild(headerTitle);
  // Render the sidebar
  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";
  const defaultSection = document.createElement("section");
  defaultSection.id = "default-section";
  const defaultList = document.createElement("ul");
  defaultList.classList.add("sidebar-list");
  const defaultInbox = document.createElement("li");
  defaultInbox.id = "default-inbox";
  defaultInbox.textContent = "Inbox";
  defaultList.appendChild(defaultInbox);
  const defaultToday = document.createElement("li");
  defaultToday.id = "default-today";
  defaultToday.textContent = "Today";
  defaultList.appendChild(defaultToday);
  const defaultUpcoming = document.createElement("li");
  defaultUpcoming.id = "default-upcoming";
  defaultUpcoming.textContent = "Upcoming";
  defaultList.appendChild(defaultUpcoming);
  defaultSection.appendChild(defaultList);
  sidebar.appendChild(defaultSection);
  const projectSection = document.createElement("section");
  projectSection.id = "project-section";
  sidebar.appendChild(projectSection);
  // Render the content
  const content = document.createElement("main");
  content.id = "content";
  const contentHeader = document.createElement("header");
  contentHeader.id = "content-header";
  const contentTitle = document.createElement("h2");
  contentTitle.id = "project-name";
  contentHeader.appendChild(contentTitle);
  const addTodoBtn = createButton("add-todo", ["add-todo"], "Add Todo", [
    "fas",
    "fa-plus",
  ]);
  contentHeader.appendChild(addTodoBtn);
  const contentWrapper = document.createElement("div");
  contentWrapper.id = "content-wrapper";
  content.appendChild(contentHeader);
  content.appendChild(contentWrapper);
  // Render the footer
  const footer = document.createElement("footer");
  const footerText = document.createElement("p");
  footerText.textContent = "© 2023 JamieYau";
  const footerLink = document.createElement("a");
  footerLink.href = "https://github.com/JamieYau";
  const footerIcon = document.createElement("i");
  footerIcon.classList.add("fab", "fa-github", "fa-fade");
  footerLink.appendChild(footerIcon);
  footer.appendChild(footerText);
  footer.appendChild(footerLink);
  // Append all elements to the container
  container.appendChild(header);
  container.appendChild(sidebar);
  container.appendChild(content);
  container.appendChild(footer);
};

// Renders the projects in the sidebar
const renderProjects = (projects) => {
  const projectSection = document.getElementById("project-section");
  projectSection.innerHTML = "";
  // Add the heading
  const heading = document.createElement("h3");
  heading.textContent = "Projects";
  projectSection.appendChild(heading);
  // Add the project list
  const projectList = document.createElement("ul");
  projectList.id = "project-list";
  projectList.className = "sidebar-list";
  projectSection.appendChild(projectList);
  // Add the project list items
  projects.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("project-list-item");
    projectItem.dataset.id = project.id;
    projectItem.textContent = project.title;
    projectList.appendChild(projectItem);
  });
  // Add the add project button
  const addProjectBtn = createButton(
    "add-project",
    ["add-project"],
    "Add Project",
    ["fas", "fa-plus"]
  );
  projectSection.appendChild(addProjectBtn);
};

// Render the todos for a project
const renderTodos = (project) => {
  const projectName = document.getElementById("project-name");
  projectName.textContent = project.title;
  projectName.dataset.projectId = project.id;
  const contentWrapper = document.getElementById("content-wrapper");
  contentWrapper.innerHTML = "";

  const todoList = document.createElement("ul");
  todoList.id = "todo-list";
  todoList.innerHTML = "";
  const todos = project.todos;
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    // ID
    todoItem.dataset.id = todo.id;
    // Is complete
    const isComplete = document.createElement("input");
    isComplete.type = "checkbox";
    isComplete.classList.add("is-complete");
    isComplete.checked = todo.isComplete;
    todoItem.appendChild(isComplete);
    // Title
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = todo.title;
    const todoDetails = document.createElement("div");
    todoDetails.classList.add("todo-details");
    todoItem.appendChild(title);
    // Priority
    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.textContent = todo.priority;
    priority.classList = todo.priority.toLowerCase();
    todoDetails.appendChild(priority);
    // Days till due
    const daysTillDue = document.createElement("div");
    daysTillDue.classList.add("days-till-due");
    daysTillDue.textContent = todo.getDaysTillDueLabel();
    todoDetails.appendChild(daysTillDue);

    todoItem.appendChild(todoDetails);
    // Actions
    const actions = document.createElement("div");
    actions.classList.add("actions");
    // Due Date
    const dueDateBtn = createButton(
      "edit-duedate",
      ["edit-duedate"],
      todo.dueDate.toLocaleDateString(),
      ["fas", "fa-calendar-days"]
    );
    actions.appendChild(dueDateBtn);
    // Edit todo
    const editBtn = createButton("edit-todo", ["edit-todo"], null, [
      "fas",
      "fa-edit",
    ]);
    actions.appendChild(editBtn);
    // Delete todo
    const deleteBtn = createButton("delete-todo", ["delete-todo"], null, [
      "fas",
      "fa-trash-can",
    ]);
    actions.appendChild(deleteBtn);

    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);
  });
  contentWrapper.appendChild(todoList);
};

// Render Modal
const renderModal = (type) => {
  const overlay = document.getElementById("overlay");
  const modal = document.createElement("div");
  modal.id = `${type}-modal`;
  modal.classList.add("modal", "hidden");
  const modalHeader = document.createElement("div");
  modalHeader.id = `${type}-modal-header`;
  modalHeader.classList = "modal-header";
  const modalTitle = document.createElement("h2");
  modalTitle.id = `${type}-modal-title`;
  modalTitle.classList = "modal-title";
  modalHeader.appendChild(modalTitle);
  const closeBtn = createButton(`close-${type}-btn`, ["close-btn"], null, [
    "fas",
    "fa-xmark",
    "fa-xl",
  ]);
  modalHeader.appendChild(closeBtn);
  modal.appendChild(modalHeader);
  const modalContent = document.createElement("div");
  modalContent.id = `${type}-modal-content`;
  modalContent.classList = "modal-content";
  modal.appendChild(modalContent);

  overlay.appendChild(modal);
};

// Render the todo descripition and details in a popup
const renderTodoDetails = (todo) => {
  showModal("todo-modal");
  // Title
  const todoTitle = document.getElementById("todo-modal-title");
  todoTitle.textContent = todo.title;
  // Content
  const content = document.getElementById("todo-modal-content");
  content.innerHTML = "";
  // Description
  const todoDescription = document.createElement("p");
  todoDescription.id = "todo-description";
  todoDescription.textContent = todo.description;
  content.appendChild(todoDescription);
  // Due date
  const todoDueDate = document.createElement("p");
  todoDueDate.id = "todo-duedate";
  todoDueDate.textContent = todo.dueDate.toLocaleDateString();
  content.appendChild(todoDueDate);
  // Tag container
  const tagContainer = document.createElement("div");
  tagContainer.id = "tag-container";
  // Priority
  const todoPriority = document.createElement("p");
  todoPriority.id = "todo-priority";
  todoPriority.textContent = todo.priority;
  todoPriority.classList = todo.priority.toLowerCase();
  tagContainer.appendChild(todoPriority);
  // Days till due
  const todoDaysTillDue = document.createElement("p");
  todoDaysTillDue.id = "todo-days-till-due";
  todoDaysTillDue.textContent = todo.getDaysTillDueLabel();
  tagContainer.appendChild(todoDaysTillDue);

  content.appendChild(tagContainer);
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Edit todo
  const editBtn = createButton("edit-todo", ["edit-todo"], null, [
    "fas",
    "fa-edit",
  ]);
  actionsContainer.appendChild(editBtn);
  // Delete todo
  const deleteBtn = createButton("delete-todo", ["delete-todo"], null, [
    "fas",
    "fa-trash-can",
  ]);
  actionsContainer.appendChild(deleteBtn);

  content.appendChild(actionsContainer);
};

// Renders the Add Project Modal
const renderAddProject = () => {
  showModal("project-modal");
  // Title
  const ModalTitle = getElement("project-modal-title");
  ModalTitle.textContent = "Add Project";
  // Content
  const content = getElement("project-modal-content");
  content.innerHTML = "";
  // Form
  const form = document.createElement("form");
  form.id = "add-project-form";
  // Title
  const projectName = document.createElement("input");
  projectName.id = "project-title";
  projectName.type = "text";
  projectName.placeholder = "Title";
  projectName.required = true;
  form.appendChild(projectName);
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Cancel
  const cancelCreate = createButton("cancel-create", ["cancel-btn"], "Cancel");
  actionsContainer.appendChild(cancelCreate);
  // Create
  const createProject = createButton("create-project", ["create-btn"], "Create");
  actionsContainer.appendChild(createProject);

  form.appendChild(actionsContainer);
  content.appendChild(form);
};

// Render the add todo Modal
const renderAddTodo = (projects) => {
  showModal("todo-modal");
  // Title
  const todoTitle = document.getElementById("todo-modal-title");
  todoTitle.textContent = "Add Todo";
  // Content
  const content = document.getElementById("todo-modal-content");
  content.innerHTML = "";
  // Form
  const form = document.createElement("form");
  form.id = "add-todo-form";
  // Title
  const todoTitleInput = document.createElement("input");
  todoTitleInput.id = "todo-title";
  todoTitleInput.type = "text";
  todoTitleInput.placeholder = "Title";
  todoTitleInput.required = true;
  form.appendChild(todoTitleInput);
  // Description
  const todoDescriptionInput = document.createElement("textarea");
  todoDescriptionInput.id = "todo-description";
  todoDescriptionInput.placeholder = "Description";
  form.appendChild(todoDescriptionInput);
  // Due date
  const todoDueDateInput = document.createElement("input");
  todoDueDateInput.id = "todo-duedate";
  todoDueDateInput.type = "date";
  todoDueDateInput.required = true;
  // Set the minimum value to today's date
  const today = new Date().toISOString().split("T")[0];
  todoDueDateInput.min = today;
  form.appendChild(todoDueDateInput);
  // Project
  const todoProjectInput = document.createElement("select");
  todoProjectInput.id = "todo-project";
  todoProjectInput.required = true;
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.title;
    // Set selected attribute if the project.id matches the currentProjectId
    if (project.id === getElement("project-name").dataset.projectId) {
      option.selected = true;
    }
    todoProjectInput.appendChild(option);
  });
  form.appendChild(todoProjectInput);
  // Priority
  const todoPriorityInput = document.createElement("select");
  todoPriorityInput.id = "todo-priority";
  todoPriorityInput.required = true;
  const priorityOptions = ["Low", "Medium", "High"];
  priorityOptions.forEach((option) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = option;
    priorityOption.textContent = option;
    todoPriorityInput.appendChild(priorityOption);
  });
  form.appendChild(todoPriorityInput);
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Cancel
  const cancelCreate = createButton("cancel-create", ["cancel-btn"], "Cancel");
  actionsContainer.appendChild(cancelCreate);
  // Save
  const saveCreate = createButton("save-create", ["save-btn"], "Save");
  saveCreate.type = "submit";
  actionsContainer.appendChild(saveCreate);

  form.appendChild(actionsContainer);
  content.appendChild(form);
};

// Render the edit todo form
const renderEditTodo = (todo) => {
  showModal("todo-modal");
  const header = document.getElementById("todo-modal-title");
  header.textContent = "Edit Todo";
  const content = document.getElementById("todo-modal-content");
  content.innerHTML = "";
  // Create the form element
  const form = document.createElement("form");
  form.id = "edit-todo-form";
  // Title
  const todoTitle = document.createElement("input");
  todoTitle.id = "todo-title";
  todoTitle.type = "text";
  todoTitle.value = todo.title;
  todoTitle.required = true;
  form.appendChild(todoTitle);
  // Description
  const todoDescription = document.createElement("textarea");
  todoDescription.id = "todo-description";
  todoDescription.textContent = todo.description;
  form.appendChild(todoDescription);
  // Due date
  const todoDueDate = document.createElement("input");
  todoDueDate.id = "todo-duedate";
  todoDueDate.type = "date";
  todoDueDate.value = todo.formatDateToISO();
  todoDueDate.required = true;
  // Set the minimum value to today's date
  const today = new Date().toISOString().split("T")[0];
  todoDueDate.min = today;
  form.appendChild(todoDueDate);
  // Priority
  const todoPriority = document.createElement("select");
  todoPriority.id = "todo-priority";
  todoPriority.required = true;
  const priorityOptions = ["Low", "Medium", "High"];
  priorityOptions.forEach((option) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = option;
    priorityOption.textContent = option;
    if (option === todo.priority) {
      priorityOption.selected = true;
    }
    todoPriority.appendChild(priorityOption);
  });
  form.appendChild(todoPriority);
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Cancel
  const cancelEdit = createButton("cancel-edit", ["cancel-btn"], "Cancel");
  actionsContainer.appendChild(cancelEdit);
  // Save
  const saveEdit = createButton("save-edit", ["save-btn"], "Save");
  saveEdit.type = "submit";
  actionsContainer.appendChild(saveEdit);

  form.appendChild(actionsContainer);
  content.appendChild(form);
};

// Render the confirmation modal for Projects and Todos
const renderConfirmationModal = (obj) => {
  hideModal("todo-modal");
  showModal("confirmation-modal");

  const modalTitle = document.getElementById("confirmation-modal-title");
  modalTitle.textContent = `Are you sure you want to delete this ${
    obj instanceof Project ? "project" : "todo"
  }?`;

  const content = document.getElementById("confirmation-modal-content");
  content.innerHTML = "";
  const details = document.createElement("div");
  details.id = "confirmation-modal-details";

  // Render confirmation modal details for a Project
  const renderConfirmationProjectDetails = (project, detailsContainer) => {
    const projectTitle = document.createElement("p");
    projectTitle.id = "confirmation-project-title";
    projectTitle.textContent = project.title;
    detailsContainer.appendChild(projectTitle);
  };

  // Render confirmation modal details for a Todo
  const renderConfirmationTodoDetails = (todo, detailsContainer) => {
    const todoTitle = document.createElement("p");
    todoTitle.id = "confirmation-todo-title";
    todoTitle.textContent = todo.title;
    detailsContainer.appendChild(todoTitle);
  };

  if (obj instanceof Project) {
    renderConfirmationProjectDetails(obj, details);
  } else if (obj instanceof Todo) {
    renderConfirmationTodoDetails(obj, details);
  }

  const actions = document.createElement("div");
  actions.id = "confirmation-modal-actions";
  const cancelDelete = createButton("cancel-delete", ["cancel-btn"], "Cancel");
  actions.appendChild(cancelDelete);
  const confirmDelete = createButton(
    "confirm-delete",
    ["confirm-btn"],
    "Confirm"
  );
  actions.appendChild(confirmDelete);

  content.appendChild(details);
  content.appendChild(actions);
  getElement("confirmation-modal").appendChild(content);
};

export {
  renderPage,
  renderProjects,
  renderAddProject,
  renderAddTodo,
  renderTodos,
  renderTodoDetails,
  renderEditTodo,
  renderConfirmationModal,
};
