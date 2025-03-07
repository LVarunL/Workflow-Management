import React, { useState } from "react";
import { useParams } from "react-router";
import MyTable from "../../common/components/Table/Table";
import { Button } from "@mui/material";
import ModalForm from "../../hooks/FormModal";
import CreateTaskForm from "../../common/components/Forms/CreateTaskForm";
import { FormTitles } from "../../common/utils/enums";
import useTasks from "../../hooks/queries/task/useTasks";
import { sortInfo, filterInfo } from "../../services/taskServices";
export default function ProjectPage() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const projectId = params.projectId || "";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<FormTitles | null>(null);
  // const [sortInfo, setSortInfo] = useState<sortInfo>({
  //   isSort: false,
  //   sortKey: null,
  //   sortOrder: null,
  // });
  // const [filterInfo, setFilterInfo] = useState<filterInfo>({
  //   isFilter: false,
  //   filterKey: null,
  //   filterValue: null,
  // });
  const openForm = (title: FormTitles) => {
    setIsOpen(true);
    setModalTitle(title);
  };

  const closeForm = () => {
    setIsOpen(false);
    setModalTitle(null);
  };

  const getFormToOpen = () => {
    if (modalTitle === FormTitles.TASK) {
      return (
        <CreateTaskForm
          onClose={closeForm}
          projectId={projectId}
          workspaceId={workspaceId}
          users={["lemon6@lemon.com", "locallocater3@gmail.com"]}
        />
      );
    }
  };

  const { data: tasks, isPending } = useTasks({});
  console.log(tasks);
  return (
    <>
      {params.projectId === "alltasks" && <div>AllTasks</div>}
      {params.projectId === "mytasks" && <div>Mytasks</div>}
      {params.projectId === "people" && <div>People</div>}
      {params.projectId !== "alltasks" &&
        params.projectId !== "mytasks" &&
        params.projectId !== "people" && <div>{params.projectId}</div>}

      <Button variant="contained" onClick={() => openForm(FormTitles.TASK)}>
        Add Task
      </Button>

      <MyTable />

      {isOpen && (
        <ModalForm title={modalTitle} isOpen={isOpen} onClose={closeForm}>
          {getFormToOpen()}
        </ModalForm>
      )}
    </>
  );
}
