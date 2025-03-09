import React, { useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import { useViewTypeToggle } from "../Inputs/ChooseViewType";
import { Searchbar } from "../Inputs/Searchbar";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModalForm from "../../../hooks/FormModal";
import CreateTaskForm from "../Forms/CreateTaskForm";
import { FormTitles } from "../../utils/enums";
import { useParams } from "react-router";
import useProjectPeople from "../../../hooks/queries/project/useProjectPeople";

interface TablebarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterQuery: React.Dispatch<React.SetStateAction<any>>; // Placeholder for filter logic
}

export default function Tablebar({
  searchQuery,
  setSearchQuery,
  setFilterQuery,
}: TablebarProps) {
  const { viewTypeToggle } = useViewTypeToggle();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const params = useParams();
  const workspaceId = params.workspaceId;
  const projectId = params.projectId;

  const { data: projectPeople } = useProjectPeople(projectId);

  const handleFilterClick = () => {};
  const handleSearch = () => {};
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {viewTypeToggle}

        <Searchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          width={250}
        />

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
        >
          Filter
        </Button>

        <Button variant="contained" onClick={() => setIsTaskFormOpen(true)}>
          Add Task
        </Button>
      </Box>

      <ModalForm
        title={FormTitles.TASK}
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
      >
        <CreateTaskForm
          onClose={() => setIsTaskFormOpen(false)}
          workspaceId={workspaceId}
          projectId={projectId}
          users={projectPeople}
        />
      </ModalForm>
    </>
  );
}
