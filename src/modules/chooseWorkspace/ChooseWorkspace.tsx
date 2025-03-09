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
import useWorkspaces from "../../hooks/queries/workspace/useWorkspaces";
import { getUserFromToken } from "../../common/utils/authUtil";
const ChooseWorkspace = () => {
  //   const workspaces: Workspace[] = WorkspaceServices.getWorkspaces();

  const { isPending, data } = useWorkspaces(getUserFromToken());
  const workspacesDropdownOptions: Option[] = data?.map((workspace) => ({
    value: workspace.id,
    name: workspace.name,
    description: workspace.description,
    image: workspace.image,
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
