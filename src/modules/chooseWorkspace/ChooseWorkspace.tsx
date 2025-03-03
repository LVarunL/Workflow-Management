import React from "react";
import { useNavigate } from "react-router";
import WorkspaceServices from "../../services/workspaceServices";
import Workspace from "../../models/Workspace";
import { Option } from "../../common/utils/interfaces";
import { useSelectDialog } from "../../common/components/SelectDialog/SelectDialogu";
import CreateWorkspaceForm from "../../common/components/Forms/CreateWorkspaceForm";

const workspaces: Workspace[] = WorkspaceServices.getWorkspaces();
const workspacesDropdownOptions: Option[] = workspaces.map((workspace) => ({
  value: workspace.id,
  name: workspace.workspaceName,
  description: workspace.workspaceDescription,
  image: workspace.workspaceImage,
}));

const ChooseWorkspace = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/workspaces/${selectedValue}`);
  };

  const { dialog, selectedValue } = useSelectDialog({
    title: "Workspace",
    options: workspacesDropdownOptions,
    defaultOpen: true,
    onSubmit: handleSubmit,
    addButton: true,
    AddForm: CreateWorkspaceForm,
  });

  return <div>{dialog}</div>;
};

export { ChooseWorkspace };
