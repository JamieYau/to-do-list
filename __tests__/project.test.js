import Project from "../src/modules/project";

describe("Project", () => {
  let project;
  beforeEach(() => {
    project = new Project("My Project");
  });

  describe("constructor", () => {
    test("creates a new project with the correct title", () => {
      // Assert
      expect(project.title).toBe("My Project");
    });
  });

  describe("setTitle", () => {
    test("updates the title correctly", () => {
      // Arrange
      const newTitle = "My New Project";
      // Act
      project.setTitle(newTitle);
      // Assert
      expect(project.title).toBe(newTitle);
    });
  });
});
