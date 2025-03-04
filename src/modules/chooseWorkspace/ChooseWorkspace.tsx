import React from "react";
import { useNavigate } from "react-router";
import WorkspaceServices from "../../services/workspaceServices";
import Workspace from "../../models/Workspace";
import { Option } from "../../common/utils/interfaces";
import { useSelectDialog } from "../../common/components/SelectDialog/SelectDialogu";
import CreateWorkspaceForm from "../../common/components/Forms/CreateWorkspaceForm";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../common/utils/enums";
const ChooseWorkspace = () => {
  //   const workspaces: Workspace[] = WorkspaceServices.getWorkspaces();

  const { isError, error, isPending, data } = useQuery({
    queryKey: [QueryKeys.WORKSPACES],
    queryFn: WorkspaceServices.getWorkspaces,
  });
  console.log("rendered");
  const workspacesDropdownOptions: Option[] = data?.map((workspace) => ({
    value: workspace.id,
    name: workspace.workspaceName,
    description: workspace.workspaceDescription,
    image: workspace.workspaceImage,
  }));
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/workspaces/${selectedValue}`);
  };

  const { dialog, selectedValue } = useSelectDialog({
    title: "Workspace",
    options: workspacesDropdownOptions || [],
    defaultOpen: true,
    onSubmit: handleSubmit,
    addButton: true,
    AddForm: CreateWorkspaceForm,
    canClose: false,
  });
  console.log(selectedValue);
  return <div>{dialog}</div>;
};

export { ChooseWorkspace };
