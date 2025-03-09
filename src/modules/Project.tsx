import React, { useState } from "react";
import { useParams } from "react-router";
import useProjectPeople from "../hooks/queries/project/useProjectPeople";
import useWorkspacePeople from "../hooks/queries/workspace/useWorkspacePeople";
import { FieldsAccessKeys } from "../common/utils/tableComponentUtil";
import Tablebar from "../common/components/Table/Tablebar";
import MyTable from "../common/components/Table/MyTable";
import { User } from "../models/User";
import { TableTypes } from "../common/utils/enums";
import useWorkspaceProjects from "../hooks/queries/project/useWorkspaceProjects";
import { Project } from "../models/Project";

export default function Projects() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [searchQuery, setSearchQuery] = useState<string>(null);
  const { data: projects } = useWorkspaceProjects(workspaceId);

  return (
    <div>
      <Tablebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Tablebar>
      <MyTable<Project>
        data={projects}
        type={TableTypes.PROJECT}
        tableHeight={850}
      />
    </div>
  );
}
