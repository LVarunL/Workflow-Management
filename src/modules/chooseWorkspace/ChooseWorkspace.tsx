import React from "react";
import { useNavigate } from "react-router";
import WorkspaceServices from "../../services/workspaceServices";
import Workspace from "../../models/Workspace";
import { Option } from "../../common/utils/interfaces";
import { useSelectDialog } from "../../common/components/SelectDialog/SelectDialogu";
import CreateWorkspaceForm from "../../common/components/Forms/CreateWorkspaceForm";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../common/utils/enums";
import CreateProjectForm from "../../common/components/Forms/CreateProjectForm";
import InviteUserForm from "../../common/components/Forms/InviteUserForm";
import { useWorkspaces } from "../../hooks/queries/WorkspaceQueries";
const ChooseWorkspace = () => {
  //   const workspaces: Workspace[] = WorkspaceServices.getWorkspaces();

  const { isPending, data } = useWorkspaces();
  const workspacesDropdownOptions: Option[] = data?.map((workspace) => ({
    value: workspace.id,
    name: workspace.workspaceName,
    description: workspace.workspaceDescription,
    image: workspace.workspaceImage,
  }));
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/${selectedOption.value}`);
  };

  const { dialog, selectedOption } = useSelectDialog({
    title: "Workspace",
    options: workspacesDropdownOptions || [],
    defaultOpen: true,
    onSubmit: handleSubmit,
    addButton: true,
    AddForm: CreateWorkspaceForm,
    canClose: false,
  });

  if (isPending) return "Loading...";
  return <div>{dialog}</div>;
};

export { ChooseWorkspace };
