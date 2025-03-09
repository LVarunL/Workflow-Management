import { useParams, useNavigate } from "react-router";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import useProject from "../../hooks/queries/project/useProject";
import { useState } from "react";
import ModalForm from "../../hooks/FormModal";
import InviteUsersForm from "../../common/components/Forms/InviteUserForm";
import { FormTitles } from "../../common/utils/enums";

const ProjectHeader = () => {
  const { workspaceId, projectId } = useParams();
  const navigate = useNavigate();
  const { data: project } = useProject(projectId);
  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);

  const handleGoToPeople = () => {
    navigate(`/${workspaceId}/${projectId}/people`);
  };

  return (
    <>
      <AppBar
        position="static"
        color="default"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          paddingY: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {project?.name || "Project"}
        </Typography>

        <Button variant="contained" size="small" onClick={handleGoToPeople}>
          People
        </Button>

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => setIsInviteFormOpen(true)}
        >
          Invite People
        </Button>
      </AppBar>

      {/* Invite People Modal */}
      <ModalForm
        title={FormTitles.INVITE}
        isOpen={isInviteFormOpen}
        onClose={() => setIsInviteFormOpen(false)}
      >
        <InviteUsersForm
          entityId={projectId!}
          type="project"
          onClose={() => setIsInviteFormOpen(false)}
        />
      </ModalForm>
    </>
  );
};

export default ProjectHeader;
