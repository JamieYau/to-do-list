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

    test("throws an error if the title is empty", () => {
      // Arrange
      const title = "";
      // Act & Assert
      expect(() => {
        new Project(title);
      }).toThrow("Title cannot be empty.");
    });

    test("creates a new project with an empty todos array", () => {
      // Assert
      expect(project.todos).toEqual([]);
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

    test("throws an error if the title is empty", () => {
      // Arrange
      const newTitle = "";
      // Act & Assert
      expect(() => {
        project.setTitle(newTitle);
      }).toThrow("Title cannot be empty.");
    });
  });
});
