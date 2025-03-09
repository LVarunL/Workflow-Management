import React from "react";
import { useParams } from "react-router";
import useProjectPeople from "../hooks/queries/project/useProjectPeople";
import useWorkspacePeople from "../hooks/queries/workspace/useWorkspacePeople";

export default function People() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const projectId = params.projectId;
  const { data: people } = projectId
    ? useProjectPeople(projectId)
    : useWorkspacePeople(workspaceId);
  console.log(people);
  return <div>People</div>;
}
