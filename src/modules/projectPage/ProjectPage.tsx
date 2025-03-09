import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyTable from "../../common/components/Table/MyTable";
import { Button } from "@mui/material";
import ModalForm from "../../hooks/FormModal";
import CreateTaskForm from "../../common/components/Forms/CreateTaskForm";
import { FormTitles, TableTypes } from "../../common/utils/enums";
import useTasks, { UseTasksParams } from "../../hooks/queries/task/useTasks";
import { sortInfo, filterInfo } from "../../services/taskServices";
import { Task } from "../../models/Task";
import { FieldsAccessKeys } from "../../common/utils/tableComponentUtil";
import { getUserFromToken } from "../../common/utils/authUtil";
import ProjectHeader from "./ProjectPageHeader";
export default function ProjectPage() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const projectId = params.projectId || "";
  console.log(params);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<FormTitles | null>(null);
  const [sortInfo, setSortInfo] = useState<sortInfo>(null);
  const [filterInfo, setFilterInfo] = useState<filterInfo[]>(null);
  const resetFilterForPage = () => {
    if (projectId === "alltasks") {
      setFilterInfo([{ filterKey: "workspaceId", filterValue: workspaceId }]);
    } else if (projectId === "mytasks") {
      setFilterInfo([
        {
          filterKey: "assignedTo",
          filterValue: getUserFromToken(),
        },
        {
          filterKey: "workspaceId",
          filterValue: workspaceId,
        },
      ]);
    } else {
      setFilterInfo([
        {
          filterKey: "projectId",
          filterValue: projectId,
        },
      ]);
    }
  };
  useEffect(() => {
    resetFilterForPage();
  }, [projectId]);
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

  const getTaskQueryParams = (): UseTasksParams => {
    let params = {};
    if (sortInfo) {
      params = { sortInfo: sortInfo };
    }
    if (filterInfo) {
      params = { ...params, filterInfo: filterInfo };
    }
    return params;
  };
  const { data: tasks, isPending } = useTasks(getTaskQueryParams());
  console.log(tasks);
  return (
    <>
      {/* {params.projectId === "alltasks" && <div>AllTasks</div>}
      {params.projectId === "mytasks" && <div>Mytasks</div>}
      {params.projectId === "people" && <div>People</div>}
      {params.projectId !== "alltasks" &&
        params.projectId !== "mytasks" &&
        params.projectId !== "people" && <div>{params.projectId}</div>} */}

      <ProjectHeader />
      <Button variant="contained" onClick={() => openForm(FormTitles.TASK)}>
        Add Task
      </Button>

      <MyTable<Task> data={tasks} type={TableTypes.TASK} />

      {isOpen && (
        <ModalForm title={modalTitle} isOpen={isOpen} onClose={closeForm}>
          {getFormToOpen()}
        </ModalForm>
      )}
    </>
  );
}
