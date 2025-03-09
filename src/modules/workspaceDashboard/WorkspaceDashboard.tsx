import React, { useState } from "react";
import { Box, Paper, Card, CardActions, CardContent } from "@mui/material";
import MyButtons from "../../common/components/Buttons/Buttons";
import ModalForm from "../../hooks/FormModal";
import { FormTitles, QueryKeys, TableTypes } from "../../common/utils/enums";
import { title } from "process";
import CreateProjectForm from "../../common/components/Forms/CreateProjectForm";
import InviteUsersForm from "../../common/components/Forms/InviteUserForm";
import WorkspaceServices from "../../services/workspaceServices";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserFromToken } from "../../common/utils/authUtil";
import WorkspaceHeader from "./WorkspaceDashboardHeader";
import useTasks from "../../hooks/queries/task/useTasks";
import { FieldsAccessKeys } from "../../common/utils/tableComponentUtil";
import useWorkspaceProjects from "../../hooks/queries/project/useWorkspaceProjects";
import useWorkspacePeople from "../../hooks/queries/workspace/useWorkspacePeople";
import MyTable from "../../common/components/Table/MyTable";
import { Project } from "../../models/Project";
import { Task } from "../../models/Task";

export default function WorkspaceDashboard() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<FormTitles | null>(null);
  const openForm = function (title: FormTitles) {
    setIsOpen(true);
    setModalTitle(title);
  };
  const closeForm = function () {
    setIsOpen(false);
    setModalTitle(null);
  };
  const getFormToOpen = function () {
    console.log("getting form to open");
    if (modalTitle === FormTitles.PROJECT) {
      return (
        <CreateProjectForm
          onClose={closeForm}
          workspaceId={workspaceId}
          currentUser={getUserFromToken()}
        />
      );
    } else if (modalTitle === FormTitles.INVITE) {
      return (
        <InviteUsersForm
          type="workspace"
          onClose={closeForm}
          entityId={workspaceId}
        />
      );
      //   else if(modalTitle===FormTitles.)
    }
  };

  const { data: tasks } = useTasks({
    filterInfo: [
      { filterKey: FieldsAccessKeys.PROJECTID, filterValue: workspaceId },
    ],
  });
  const { data: projects } = useWorkspaceProjects(workspaceId);
  const { data: people } = useWorkspacePeople(workspaceId);
  return (
    <>
      <WorkspaceHeader />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          height: "90vh",
          paddingTop: 2,
        }}
      >
        <Card
          sx={{
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ height: "80%" }}>
            <MyTable<Project>
              data={projects}
              type={TableTypes.PROJECT}
              columns={[
                FieldsAccessKeys.ID,
                FieldsAccessKeys.NAME,
                FieldsAccessKeys.DESCRIPTION,
              ]}
            />
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "flex-end", marginRight: 2 }}
          >
            <MyButtons.AddButton
              width={50}
              onClick={() => openForm(FormTitles.PROJECT)}
            />
          </CardActions>
        </Card>

        <Card sx={{ height: "100%", overflow: "auto" }}>
          <CardContent>
            <MyTable<Task>
              data={tasks}
              type={TableTypes.TASK}
              columns={[
                FieldsAccessKeys.NAME,
                FieldsAccessKeys.DEADLINE,
                FieldsAccessKeys.ASSIGNEDTO,
                FieldsAccessKeys.PRIORITY,
                FieldsAccessKeys.STATUS,
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ height: "80%" }}>
            <MyTable<string> data={people} type={TableTypes.PEOPLE} />
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "flex-end", marginRight: 2 }}
          >
            <MyButtons.AddButton
              width={50}
              onClick={() => openForm(FormTitles.INVITE)}
            />
          </CardActions>
        </Card>

        <Card sx={{ height: "100%" }}>
          <CardContent>Messages</CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MyButtons.AddButton width={50} disabled />
          </CardActions>
        </Card>
      </Box>

      {isOpen && (
        <ModalForm title={modalTitle} isOpen={isOpen} onClose={closeForm}>
          {getFormToOpen()}
        </ModalForm>
      )}
    </>
  );
}
