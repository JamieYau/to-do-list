const renderPage = () => {
  const container = document.getElementById("container");
  container.innerHTML = "";
  // Render the header
  const header = document.createElement("header");
  header.id = "header";
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

// Render the todos for a project
const renderTodos = (project) => {
  const content = document.getElementById("content");
  content.innerHTML = "";
  const projectName = document.createElement("h2");
  projectName.id = "project-name";
  projectName.textContent = project.title;
  const todoWrapper = document.createElement("div");
  todoWrapper.id = "todo-wrapper";

  const todoList = document.createElement("ul");
  todoList.id = "todo-list";
  todoList.innerHTML = "";
  const todos = project.todos;
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
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
    // Days till due
    const daysTillDue = document.createElement("div");
    daysTillDue.classList.add("days-till-due");
    daysTillDue.textContent = getDaysTillDueLabel(todo.daysTillDue);
    // Priority
    const priority = document.createElement("div");
    priority.classList.add("priority");
    priority.textContent = todo.priority;
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
    todoDetails.appendChild(daysTillDue);
    todoDetails.appendChild(priority);
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
  todoWrapper.appendChild(todoList);
  content.appendChild(projectName);
  content.appendChild(todoWrapper);
};

const getDaysTillDueLabel = (daysTillDue) => {
  if (daysTillDue === 1) {
    return "1 day left";
  } else if (daysTillDue === 0) {
    return "Due today";
  } else if (daysTillDue < 0) {
    return "Overdue";
  } else {
    return `${daysTillDue} days left`;
  }
};

export { renderPage, renderProjects, renderTodos };
