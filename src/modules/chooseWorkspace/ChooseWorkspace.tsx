import React from "react";
import IconBreadcrumbs from "../../common/components/Breadcrumbs/Breadcrumbs";
import { BreadcrumbContext } from "../../common/utils/enums";
import MyButtons from "../../common/components/Buttons/Buttons";
import { useSelectDialog } from "../../common/components/SelectDialog/SelectDialogu";
import ontic from "../../assets/images/ontic.png";
import csoc from "../../assets/images/csoc.png";
import icm from "../../assets/images/icm.png";
import { useNavigate } from "react-router";
const workspaces = [
  {
    value: "Ontic",
    name: "Ontic",
    image: ontic,
    description: "OnticDescription",
  },
  { value: "CSOC", name: "CSOC", image: csoc, description: "CSOCDescription" },
  { value: "ICM", name: "ICM", image: icm, description: "ICMDescription" },
];
const ChooseWorkspace = function () {
  const navigate = useNavigate();
  const handleSubmit = function () {
    navigate(`/workspaces/${selectedValue}?lemon=patan`);
  };
  const { dialog, selectedValue, setOpen } = useSelectDialog({
    title: "Workspace",
    options: workspaces,
    defaultOpen: true,
    onSubmit: handleSubmit,
  });
  return (
    <div>
      {dialog}
      {selectedValue}
    </div>
  );
};

export { ChooseWorkspace };
