import React, { useState } from "react";
import { useParams } from "react-router";
import useProjectPeople from "../hooks/queries/project/useProjectPeople";
import useWorkspacePeople from "../hooks/queries/workspace/useWorkspacePeople";
import { FieldsAccessKeys } from "../common/utils/tableComponentUtil";
import Tablebar from "../common/components/Table/Tablebar";
import MyTable from "../common/components/Table/MyTable";
import { User } from "../models/User";
import { TableTypes } from "../common/utils/enums";

export default function People() {
  const params = useParams();
  const workspaceId = params.workspaceId;
  const projectId = params.projectId;
  const [searchQuery, setSearchQuery] = useState<string>(null);
  const { data: people } = projectId
    ? useProjectPeople(projectId)
    : useWorkspacePeople(workspaceId);
  console.log(people);
  const columns = [FieldsAccessKeys.EMAIL];

  return (
    <div>
      <Tablebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Tablebar>
      <MyTable<string>
        data={people}
        type={TableTypes.PEOPLE}
        columns={columns}
      />
    </div>
  );
}
