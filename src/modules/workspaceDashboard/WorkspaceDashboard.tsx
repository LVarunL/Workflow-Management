import React, { useState } from "react";
import { Box, Paper, Card, CardActions, CardContent } from "@mui/material";
import MyButtons from "../../common/components/Buttons/Buttons";
import ModalForm from "../../hooks/FormModal";
import { FormTitles, QueryKeys } from "../../common/utils/enums";
import { title } from "process";
import CreateProjectForm from "../../common/components/Forms/CreateProjectForm";
import InviteUsersForm from "../../common/components/Forms/InviteUserForm";
import WorkspaceServices from "../../services/workspaceServices";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserFromToken } from "../../common/utils/authUtil";
import WorkspaceHeader from "./WorkspaceDashboardHeader";

export default function WorkspaceDashboard() {
  const params = useParams();
  const currentWorkspaceId = params.workspaceId;
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
          workspaceId={currentWorkspaceId}
          currentUser={getUserFromToken()}
        />
      );
    } else if (modalTitle === FormTitles.INVITE) {
      return (
        <InviteUsersForm
          type="workspace"
          onClose={closeForm}
          entityId={currentWorkspaceId}
        />
      );
      //   else if(modalTitle===FormTitles.)
    }
  };
  return (
    <>
      <WorkspaceHeader />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          height: "90vh",
        }}
      >
        <Card
          sx={{
            display: "flex",
            minWidth: "50%",
            height: "50%",
            justifyContent: "space-between",
          }}
        >
          <CardContent>Projects</CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <MyButtons.AddButton
              width={50}
              onClick={() => openForm(FormTitles.PROJECT)}
            />
          </CardActions>
        </Card>
        <Card
          sx={{
            display: "flex",
            minWidth: "50%",
            height: "50%",
            justifyContent: "space-between",
          }}
        >
          <CardContent>My Tasks</CardContent>
        </Card>
        <Card
          sx={{
            display: "flex",
            minWidth: "50%",
            height: "50%",
            justifyContent: "space-between",
          }}
        >
          <CardContent>People</CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <MyButtons.AddButton
              width={50}
              onClick={() => openForm(FormTitles.INVITE)}
            />
          </CardActions>
        </Card>
        <Card
          sx={{
            display: "flex",
            minWidth: "50%",
            height: "50%",
            justifyContent: "space-between",
          }}
        >
          <CardContent>Messages</CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
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
