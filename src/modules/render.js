const renderProjects = (projects) => {
  const projectSection = document.getElementById("project-section");
  projectSection.innerHTML = "";
  const heading = document.createElement("h3");
  heading.textContent = "Projects";
  projectSection.appendChild(heading);
  const projectList = document.createElement("ul");
  projectList.id = "project-list";
  projectList.className = "sidebar-list";
  projectSection.appendChild(projectList);
  projects.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("project-list-item");
    projectItem.dataset.id = project.id;
    projectItem.textContent = project.title;
    projectList.appendChild(projectItem);
  });
  const addProject = document.createElement("div");
  addProject.id = "add-project";
  addProject.classList.add("add-project");
  const addProjectIcon = document.createElement("i");
  addProjectIcon.classList.add("fas", "fa-plus");
  const addProjectText = document.createElement("span");
  addProjectText.textContent = " Add Project";
  addProject.appendChild(addProjectIcon);
  addProject.appendChild(addProjectText);
  projectSection.appendChild(addProject);
};

/* Render the todos for a project in this format:
<ul id="todo-list">
            <li class="todo-item">
              <input type="checkbox" class="is-complete" />
              <div class="title">Go gym</div>
              <div class="todo-details">
                <div class="days-till-due">3 days</div>
                <div class="priority">High</div>
              </div>
              <div class="actions">
                <button class="duedate">
                  <i class="fas fa-calendar-days"></i>
                  <span>2020-10-10</span>
                </button>
                <button class="edit-todo">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="delete-todo">
                  <i class="fas fa-trash-can"></i>
                </button>
              </div>
            </li>
*/

const renderTodos = (todos) => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
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

export { renderProjects, renderTodos };
