import { Project } from "../models/Project";
import { LocalStorageKeys } from "../common/utils/enums";

class ProjectServicesClass {
  getProjects = async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      let projects = JSON.parse(
        localStorage.getItem(LocalStorageKeys.PROJECTS) || "[]"
      );
      projects = projects.filter((project: Project) => !project.isDeleted);
      resolve(projects);
    });
  };

  getProjectById = async (id: string): Promise<Project> => {
    return new Promise(async (resolve) => {
      const projects = await this.getProjects();
      const project = projects.find((p) => p.id === id) || null;
      resolve(project);
    });
  };

  upsertProject = async (project: Project): Promise<Project> => {
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
  };

  getWorkspaceProjects = async (workspaceId: string): Promise<Project[]> => {
    return new Promise(async (resolve) => {
      let projects = await this.getProjects();
      projects = projects.filter(
        (project) => project.workspaceId === workspaceId
      );
      resolve(projects);
    });
  };

  addUsersToProject = async (projectId: string, emails: string[]) => {
    return new Promise(async (resolve) => {
      const projects = await this.getProjects();
      const project = projects.find((project) => project.id === projectId);
      if (!project) return resolve(null);

      const userList = project.userList || [];
      emails.forEach((email) => {
        if (!userList.includes(email)) {
          userList.push(email);
        }
      });
      project.userList = userList;
      localStorage.setItem(LocalStorageKeys.PROJECTS, JSON.stringify(projects));
      resolve(project);
    });
  };

  getAllUsersInProject = async (
    projectId: string
  ): Promise<{ id: string }[]> => {
    const project = await this.getProjectById(projectId);
    const users = project?.userList.map((user) => ({ id: user })) || [];
    return users;
  };

  deleteProject = async (projectId: string) => {
    console.log("Deleting project...");
    let projects: Project[] = await this.getProjects();
    projects = projects.map((project) =>
      project.id === projectId ? { ...project, isDeleted: true } : project
    );
    localStorage.setItem(LocalStorageKeys.PROJECTS, JSON.stringify(projects));
  };
}

const ProjectServices = new ProjectServicesClass();
export default ProjectServices;
