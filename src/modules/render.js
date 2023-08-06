const renderPage = () => {
  const container = document.getElementById("container");
  container.innerHTML = "";
  // Render Modal
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("hidden");
  container.appendChild(overlay);
  renderModal("todo");
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
  const defaultToday = document.createElement("li");
  defaultToday.id = "default-today";
  defaultToday.textContent = "Today";
  const defaultUpcoming = document.createElement("li");
  defaultUpcoming.id = "default-upcoming";
  defaultUpcoming.textContent = "Upcoming";
  defaultList.appendChild(defaultInbox);
  defaultList.appendChild(defaultToday);
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
  const addTodo = document.createElement("button");
  addTodo.id = "add-todo";
  addTodo.classList.add("add-todo");
  const addTodoIcon = document.createElement("i");
  addTodoIcon.classList.add("fas", "fa-plus");
  const addTodoText = document.createElement("span");
  addTodoText.textContent = " Add Todo";
  addTodo.appendChild(addTodoIcon);
  addTodo.appendChild(addTodoText);
  contentHeader.appendChild(contentTitle);
  contentHeader.appendChild(addTodo);
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
  const addProject = document.createElement("div");
  addProject.id = "add-project";
  addProject.classList.add("add-project");
  const addProjectIcon = document.createElement("i");
  addProjectIcon.classList.add("fas", "fa-plus");
  const addProjectText = document.createElement("span");
  addProjectText.textContent = " Add Project";
  // Append all elements to the container
  addProject.appendChild(addProjectIcon);
  addProject.appendChild(addProjectText);
  projectSection.appendChild(addProject);
};

const renderAddTodo = (projects) => {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  const modal = document.getElementById("todo-modal");
  modal.classList.remove("hidden");
  // Title
  const todoTitle = document.getElementById("todo-modal-title");
  todoTitle.textContent = "Add Todo";
  // Content
  const content = document.getElementById("todo-modal-content");
  content.innerHTML = "";
  // Title
  const todoTitleInput = document.createElement("input");
  todoTitleInput.id = "todo-title";
  todoTitleInput.type = "text";
  todoTitleInput.placeholder = "Title";
  // Description
  const todoDescriptionInput = document.createElement("textarea");
  todoDescriptionInput.id = "todo-description";
  todoDescriptionInput.placeholder = "Description";
  // Due date
  const todoDueDateInput = document.createElement("input");
  todoDueDateInput.id = "todo-duedate";
  todoDueDateInput.type = "date";
  // Project
  const todoProjectInput = document.createElement("select");
  todoProjectInput.id = "todo-project";
  projects.forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.id;
    projectOption.textContent = project.title;
    todoProjectInput.appendChild(projectOption);
  });
  // Priority
  const todoPriorityInput = document.createElement("select");
  todoPriorityInput.id = "todo-priority";
  const priorityOptions = ["Low", "Medium", "High"];
  priorityOptions.forEach((option) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = option;
    priorityOption.textContent = option;
    todoPriorityInput.appendChild(priorityOption);
  });
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Cancel
  const cancelEdit = document.createElement("button");
  cancelEdit.id = "cancel-create";
  cancelEdit.classList.add("cancel-btn");
  cancelEdit.textContent = "Cancel";
  // Save
  const saveCreate = document.createElement("button");
  saveCreate.id = "save-create";
  saveCreate.classList.add("save-btn");
  saveCreate.textContent = "Create";
  // Append all elements to the container
  content.appendChild(todoTitleInput);
  content.appendChild(todoDescriptionInput);
  content.appendChild(todoDueDateInput);
  content.appendChild(todoProjectInput);
  content.appendChild(todoPriorityInput);
  actionsContainer.appendChild(cancelEdit);
  actionsContainer.appendChild(saveCreate);
  content.appendChild(actionsContainer);
};

// Render the todos for a project
const renderTodos = (project) => {
  const projectName = document.getElementById("project-name");
  projectName.textContent = project.title;
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
    // Title
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = todo.title;
    const todoDetails = document.createElement("div");
    todoDetails.classList.add("todo-details");
    // Priority
    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.textContent = todo.priority;
    priority.classList = todo.priority.toLowerCase();
    // Days till due
    const daysTillDue = document.createElement("div");
    daysTillDue.classList.add("days-till-due");
    daysTillDue.textContent = todo.getDaysTillDueLabel();
    // Actions
    const actions = document.createElement("div");
    actions.classList.add("actions");
    // Due Date
    const dueDate = document.createElement("button");
    dueDate.classList.add("duedate");
    const dueDateIcon = document.createElement("i");
    dueDateIcon.classList.add("fas", "fa-calendar-days");
    const dueDateText = document.createElement("span");
    dueDateText.textContent = todo.dueDate.toLocaleDateString();
    // Edit todo
    const editTodo = document.createElement("button");
    editTodo.classList.add("edit-todo");
    const editTodoIcon = document.createElement("i");
    editTodoIcon.classList.add("fas", "fa-edit");
    // Delete todo
    const deleteTodo = document.createElement("button");
    deleteTodo.classList.add("delete-todo");
    const deleteTodoIcon = document.createElement("i");
    deleteTodoIcon.classList.add("fas", "fa-trash-can");

    todoItem.appendChild(isComplete);
    todoItem.appendChild(title);
    todoDetails.appendChild(priority);
    todoDetails.appendChild(daysTillDue);
    todoItem.appendChild(todoDetails);
    dueDate.appendChild(dueDateIcon);
    dueDate.appendChild(dueDateText);
    actions.appendChild(dueDate);
    editTodo.appendChild(editTodoIcon);
    actions.appendChild(editTodo);
    deleteTodo.appendChild(deleteTodoIcon);
    actions.appendChild(deleteTodo);
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
  const closeButton = document.createElement("button");
  closeButton.classList = "close-btn";
  const closeBtnIcon = document.createElement("i");
  closeBtnIcon.classList.add("fas", "fa-xmark", "fa-xl");
  closeButton.appendChild(closeBtnIcon);
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modal.appendChild(modalHeader);
  const modalContent = document.createElement("div");
  modalContent.id = `${type}-modal-content`;
  modalContent.classList = "modal-content";
  modal.appendChild(modalContent);

  overlay.appendChild(modal);
};

// Render the todo descripition and details in a popup
const renderTodoDetails = (todo) => {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  const modal = document.getElementById("todo-modal");
  modal.classList.remove("hidden");
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
  // Due date
  const todoDueDate = document.createElement("p");
  todoDueDate.id = "todo-duedate";
  todoDueDate.textContent = todo.dueDate.toLocaleDateString();
  // Tag container
  const tagContainer = document.createElement("div");
  tagContainer.id = "tag-container";
  // Priority
  const todoPriority = document.createElement("p");
  todoPriority.id = "todo-priority";
  todoPriority.textContent = todo.priority;
  todoPriority.classList = todo.priority.toLowerCase();
  // Days till due
  const todoDaysTillDue = document.createElement("p");
  todoDaysTillDue.id = "todo-days-till-due";
  todoDaysTillDue.textContent = todo.getDaysTillDueLabel();
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Edit todo
  const editTodo = document.createElement("button");
  editTodo.id = "edit-todo";
  editTodo.classList.add("edit-todo");
  const editTodoIcon = document.createElement("i");
  editTodoIcon.classList.add("fas", "fa-edit");
  editTodo.appendChild(editTodoIcon);
  // Delete todo
  const deleteTodo = document.createElement("button");
  deleteTodo.id = "delete-todo";
  deleteTodo.classList.add("delete-todo");
  const deleteTodoIcon = document.createElement("i");
  deleteTodoIcon.classList.add("fas", "fa-trash-can");
  deleteTodo.appendChild(deleteTodoIcon);
  // Append all elements to the container
  content.appendChild(todoDescription);
  content.appendChild(todoDueDate);
  tagContainer.appendChild(todoPriority);
  tagContainer.appendChild(todoDaysTillDue);
  content.appendChild(tagContainer);
  actionsContainer.appendChild(editTodo);
  actionsContainer.appendChild(deleteTodo);
  content.appendChild(actionsContainer);
};

// Render the edit todo form
const renderEditTodo = (todo) => {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  const modal = document.getElementById("todo-modal");
  modal.classList.remove("hidden");
  const header = document.getElementById("todo-modal-title");
  header.textContent = "Edit Todo";
  const content = document.getElementById("todo-modal-content");
  content.innerHTML = "";
  // Title
  const todoTitle = document.createElement("input");
  todoTitle.id = "todo-title";
  todoTitle.type = "text";
  todoTitle.value = todo.title;
  // Description
  const todoDescription = document.createElement("textarea");
  todoDescription.id = "todo-description";
  todoDescription.textContent = todo.description;
  // Due date
  const todoDueDate = document.createElement("input");
  todoDueDate.id = "todo-duedate";
  todoDueDate.type = "date";
  todoDueDate.value = todo.formatDateToISO();
  // Priority
  const todoPriority = document.createElement("select");
  todoPriority.id = "todo-priority";
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
  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "actions-container";
  // Cancel
  const cancelEdit = document.createElement("button");
  cancelEdit.id = "cancel-edit";
  cancelEdit.classList.add("cancel-btn");
  cancelEdit.textContent = "Cancel";
  // Save
  const saveEdit = document.createElement("button");
  saveEdit.id = "save-edit";
  saveEdit.classList.add("save-btn");
  saveEdit.textContent = "Save";
  // Append all elements to the container
  content.appendChild(todoTitle);
  content.appendChild(todoDescription);
  content.appendChild(todoDueDate);
  content.appendChild(todoPriority);
  actionsContainer.appendChild(cancelEdit);
  actionsContainer.appendChild(saveEdit);
  content.appendChild(actionsContainer);
};

// Render the confirmation modal for Projects and todos
const renderConfirmationModal = (type, obj) => {
  const todoModal = document.getElementById("todo-modal");
  todoModal.classList.add("hidden");
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  const modal = document.getElementById("confirmation-modal");
  modal.classList.remove("hidden");
  const header = document.getElementById("confirmation-modal-header");
  header.textContent = `Are you sure you want to delete this ${type}?`;
  const content = document.getElementById("confirmation-modal-content");
  content.innerHTML = "";
  const details = document.createElement("div");
  details.id = "confirmation-modal-details";
  if (type === "project") {
    const projectTitle = document.createElement("p");
    projectTitle.id = "confirmation-project-title";
    projectTitle.textContent = obj.title;
    details.appendChild(projectTitle);
  } else if (type === "todo") {
    const todoTitle = document.createElement("p");
    todoTitle.id = "confirmation-todo-title";
    todoTitle.textContent = obj.title;
    details.appendChild(todoTitle);
  }
  content.appendChild(details);
  const actions = document.createElement("div");
  actions.id = "confirmation-modal-actions";
  const cancel = document.createElement("button");
  cancel.id = "cancel-delete";
  cancel.classList.add("cancel-btn");
  cancel.textContent = "Cancel";
  const confirm = document.createElement("button");
  confirm.id = "confirm-delete";
  confirm.classList.add("confirm-delete");
  confirm.textContent = "Confirm";
  actions.appendChild(cancel);
  actions.appendChild(confirm);
  content.appendChild(actions);
  overlay.appendChild(modal);
};

export {
  renderPage,
  renderProjects,
  renderAddTodo,
  renderTodos,
  renderTodoDetails,
  renderEditTodo,
  renderConfirmationModal,
};