import { Project } from "../../../../models/Project";
import {
  Field,
  FieldsAccessKeys,
  getRandomColor,
  TableConfigs,
  Columns,
} from "../../../utils/tableComponentUtil";
import { Tooltip, Chip } from "@mui/material";

const ProjectTableColumns: Columns = [
  FieldsAccessKeys.ID,
  FieldsAccessKeys.NAME,
  FieldsAccessKeys.DESCRIPTION,
  FieldsAccessKeys.CREATEDBY,
  FieldsAccessKeys.CREATIONTIME,
  FieldsAccessKeys.LASTMODIFIEDBY,
  FieldsAccessKeys.LASTMODIFIEDTIME,
];

const ID: Field = {
  label: "ID",
  width: 150,
  renderCell: (data: Project) => (
    <Tooltip title={data.projectId} arrow>
      <div
        style={{
          width: ID.width,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
        }}
      >
        {data.projectId}
      </div>
    </Tooltip>
  ),
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.ID,
};

const Name: Field = {
  label: "Project Name",
  width: 100,
  renderCell: (data: Project) => (
    <div
      style={{
        fontWeight: 500,
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: 4,
        width: Name.width,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f6f6f6")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {data.projectName}
    </div>
  ),
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.NAME,
};

const Description: Field = {
  label: "Description",
  width: 150,
  renderCell: (data: Project) => (
    <Tooltip title={data.projectDescription} arrow>
      <div
        style={{
          width: Description.width,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
        }}
      >
        {data.projectDescription}
      </div>
    </Tooltip>
  ),
  canSort: false,
  canFilter: false,
  isVisible: true,
  accessKey: FieldsAccessKeys.DESCRIPTION,
};

const CreatedBy: Field = {
  label: "Created By",
  width: 20,
  renderCell: (data: Project) => (
    <Tooltip title={data.createdBy} arrow sx={{ width: CreatedBy.width }}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white"
        style={{ backgroundColor: getRandomColor(data.createdBy) }}
      >
        {data.createdBy.charAt(0).toUpperCase()}
      </div>
    </Tooltip>
  ),
  canSort: false,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.CREATEDBY,
};

const CreationTime: Field = {
  label: "Created On",
  width: 140,
  renderCell: (data: Project) => (
    <Tooltip
      title={new Date(data.creationTime).toLocaleString()}
      arrow
      sx={{ width: CreationTime.width }}
    >
      <span>
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(data.creationTime))}
      </span>
    </Tooltip>
  ),
  canSort: true,
  canFilter: false,
  isVisible: true,
  accessKey: FieldsAccessKeys.CREATIONTIME,
};

const LastModifiedBy: Field = {
  label: "Last Modified By",
  width: 20,
  renderCell: (data: Project) =>
    data.lastModifiedBy ? (
      <div></div>
    ) : (
      <Tooltip title={data.lastModifiedBy} arrow sx={{ width: 140 }}>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white"
          style={{ backgroundColor: getRandomColor(data.lastModifiedBy || "") }}
        >
          {data.lastModifiedBy?.charAt(0).toUpperCase() || "-"}
        </div>
      </Tooltip>
    ),
  canSort: false,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.LASTMODIFIEDBY,
};

const LastModifiedTime: Field = {
  label: "Last Modified On",
  width: 140,
  renderCell: (data: Project) =>
    data.lastModifiedTime ? (
      <div></div>
    ) : (
      <Tooltip
        title={new Date(data.lastModifiedTime || "").toLocaleString()}
        arrow
        sx={{ width: LastModifiedTime.width }}
      >
        <span>
          {data.lastModifiedTime
            ? new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(data.lastModifiedTime))
            : "-"}
        </span>
      </Tooltip>
    ),
  canSort: true,
  canFilter: false,
  isVisible: true,
  accessKey: FieldsAccessKeys.LASTMODIFIEDTIME,
};

const getProjectTableField = (accessKey: FieldsAccessKeys): Field => {
  switch (accessKey) {
    case FieldsAccessKeys.ID:
      return ID;
    case FieldsAccessKeys.NAME:
      return Name;
    case FieldsAccessKeys.DESCRIPTION:
      return Description;
    case FieldsAccessKeys.CREATEDBY:
      return CreatedBy;
    case FieldsAccessKeys.CREATIONTIME:
      return CreationTime;
    case FieldsAccessKeys.LASTMODIFIEDBY:
      return LastModifiedBy;
    case FieldsAccessKeys.LASTMODIFIEDTIME:
      return LastModifiedTime;
  }
};

const ProjectTableConfigs: TableConfigs = {
  columns: ProjectTableColumns,
  getTableField: getProjectTableField,
};

export default ProjectTableConfigs;
