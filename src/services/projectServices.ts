import { Project } from "../models/Project";
import { LocalStorageKeys } from "../common/utils/enums";

class ProjectServicesClass {
  async getProjects(): Promise<Project[]> {
    return new Promise((resolve) => {
      let projects = JSON.parse(
        localStorage.getItem(LocalStorageKeys.PROJECTS) || "[]"
      );
      projects = projects.filter((project: Project) => !project.isDeleted);
      resolve(projects);
    });
  }

  async getProjectById(id: string): Promise<Project> {
    return new Promise(async (resolve) => {
      const projects = await this.getProjects();

      const project = projects.find((p) => p.id === id) || null;

      resolve(project);
    });
  }

  async upsertProject(project: Project): Promise<Project> {
    return new Promise(async (resolve) => {
      let projects = await this.getProjects();
      const existingIndex = projects.findIndex((p) => p.id === project.id);

      if (existingIndex !== -1) {
        projects[existingIndex] = project;
      } else {
        projects = [project, ...projects];
      }

      localStorage.setItem(LocalStorageKeys.PROJECTS, JSON.stringify(projects));
      resolve(project);
    });
  }

  async getWorkspaceProjects(workspaceId: string): Promise<Project[]> {
    return new Promise(async (resolve) => {
      let projects = await this.getProjects();
      projects = projects.filter(
        (project) => project.workspaceId === workspaceId
      );

      resolve(projects);
    });
  }
  async addUsersToProject(projectId: string, emails: string[]) {
    return new Promise(async (resolve) => {
      const projects = await this.getProjects();
      const project = projects.find((project) => project.id === projectId);
      const userList = project.userList;
      emails.forEach((email) => {
        if (!userList.includes(email)) {
          userList.push(email);
        }
      });
      project.userList = userList;
      localStorage.setItem(LocalStorageKeys.PROJECTS, JSON.stringify(projects));
      resolve(project);
    });
  }
  async getAllUsersInProject(projectId: string): Promise<string[]> {
    return new Promise(async (resolve) => {
      const project = await this.getProjectById(projectId);
      resolve(project?.userList || []);
    });
  }
}

const ProjectServices = new ProjectServicesClass();
export default ProjectServices;
