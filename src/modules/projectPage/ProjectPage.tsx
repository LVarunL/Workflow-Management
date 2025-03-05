import React from "react";
import { useParams } from "react-router";

export default function ProjectPage() {
  const params = useParams();

  return (
    <>
      {params.projectId === "alltasks" && <div>AllTasks</div>}
      {params.projectId === "mytasks" && <div>Mytasks</div>}
      {params.projectId === "people" && <div>People</div>}
      {params.projectId !== "alltasks" &&
        params.projectId !== "mytasks" &&
        params.projectId !== "people" && <div>{params.projectId}</div>}
    </>
  );
}
