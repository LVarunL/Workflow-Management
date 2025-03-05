import { Project } from "../models/Project";
import { LocalStorageKeys } from "../common/utils/enums";

class ProjectServicesClass {
  async getProjects(): Promise<Project[]> {
    return new Promise((resolve) => {
      const projects = JSON.parse(
        localStorage.getItem(LocalStorageKeys.PROJECTS) || "[]"
      );
      resolve(projects);
    });
  }

  async addProject(project: Project): Promise<Project> {
    return new Promise(async (resolve) => {
      const projects = await this.getProjects();
      projects.push(project);
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
      const project = projects.find(
        (project) => project.projectId === projectId
      );
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
}

const ProjectServices = new ProjectServicesClass();
export default ProjectServices;
