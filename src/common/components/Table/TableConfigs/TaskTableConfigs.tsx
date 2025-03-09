import { Task } from "../../../../models/Task";
import { TaskPriority, TaskStatus } from "../../../utils/enums";
import {
  Field,
  FieldsAccessKeys,
  getRandomColor,
  TableConfigs,
} from "../../../utils/tableComponentUtil";
import { Columns } from "../../../utils/tableComponentUtil";

import { Tooltip, Chip, Avatar, Stack } from "@mui/material";
const TaskTableColumns: Columns = [
  FieldsAccessKeys.ID,
  FieldsAccessKeys.NAME,
  FieldsAccessKeys.DESCRIPTION,
  FieldsAccessKeys.STATUS,
  FieldsAccessKeys.PRIORITY,
  FieldsAccessKeys.ASSIGNEDTO,
  FieldsAccessKeys.CREATEDBY,
  FieldsAccessKeys.LASTMODIFIEDBY,
  FieldsAccessKeys.CREATIONTIME,
  FieldsAccessKeys.DEADLINE,
  FieldsAccessKeys.LASTMODIFIEDTIME,
];

const ID: Field = {
  label: "ID",
  width: 80,
  renderCell: (data: Task) => (
    <Tooltip title={data.id} arrow sx={{ width: ID.width }}>
      <div
        style={{
          width: 80,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
        }}
      >
        {data.id}
      </div>
    </Tooltip>
  ),
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.ID,
};

const Name: Field = {
  label: "Name",
  width: 100,
  renderCell: (data: Task) => (
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
      {data.name}
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
  renderCell: (data: Task) => (
    <Tooltip
      title={data.description}
      style={{ width: Description.width }}
      arrow
    >
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
          width: Description.width,
        }}
      >
        {data.description}
      </div>
    </Tooltip>
  ),
  canSort: false,
  canFilter: false,
  isVisible: true,
  accessKey: FieldsAccessKeys.DESCRIPTION,
};

const Status: Field = {
  label: "Status",
  width: 100,
  renderCell: (data: Task) => {
    const getMUIChipColorFromStatus = (taskStatus: TaskStatus) => {
      switch (taskStatus) {
        case TaskStatus.NOT_STARTED:
          return "error";
        case TaskStatus.IN_PROGRESS:
          return "secondary";
        case TaskStatus.IN_REVIEW:
          return "warning";
        case TaskStatus.COMPLETED:
          return "success";
      }
    };

    return (
      <Chip
        label={data.status}
        variant="outlined"
        size="small"
        color={getMUIChipColorFromStatus(data.status)}
        style={{
          fontWeight: 500,
          borderRadius: 8,
        }}
        sx={{ width: Status.width }}
      />
    );
  },
  canSort: false,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.STATUS,
};

const Priority: Field = {
  label: "Priority",
  width: 80,
  renderCell: (data: Task) => {
    const getMUIChipColorFromPriority = (taskpriority: TaskPriority) => {
      switch (taskpriority) {
        case TaskPriority.LOW:
          return "success";
        case TaskPriority.MEDIUM:
          return "warning";
        case TaskPriority.HIGH:
          return "error";
      }
    };

    return (
      <Chip
        label={data.priority}
        color={getMUIChipColorFromPriority(data.priority)}
        size="small"
        variant="filled"
        style={{
          fontWeight: 500,
          borderRadius: 8,
          width: Priority.width,
        }}
      />
    );
  },
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.PRIORITY,
};

const AssignedTo: Field = {
  label: "Assignee",
  width: 30,
  renderCell: (data: Task) => (
    <Tooltip title={data.assignedTo} arrow style={{ width: AssignedTo.width }}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white"
        style={{ backgroundColor: getRandomColor(data.assignedTo) }}
      >
        {data.assignedTo.charAt(0).toUpperCase()}
      </div>
    </Tooltip>
  ),
  canSort: false,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.ASSIGNEDTO,
};

const CreatedBy: Field = {
  label: "Created By",
  width: 30,
  renderCell: (data: Task) => (
    <Tooltip title={data.createdBy} arrow style={{ width: CreatedBy.width }}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white"
        style={{ backgroundColor: getRandomColor(data.assignedTo) }}
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

const LastModifiedBy: Field = {
  label: "Mofified By",
  width: 30,
  renderCell: (data: Task) => (
    <Tooltip
      title={data.lastModifiedBy}
      arrow
      style={{ width: LastModifiedBy.width }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm text-white"
        style={{ backgroundColor: getRandomColor(data.assignedTo) }}
      >
        {data.lastModifiedBy.charAt(0).toUpperCase()}
      </div>
    </Tooltip>
  ),
  canSort: false,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.LASTMODIFIEDBY,
};

const CreationTime: Field = {
  label: "Created On",
  width: 50,
  renderCell: (data: Task) => (
    <Tooltip
      title={new Date(data.creationTime).toLocaleString()}
      arrow
      style={{ maxWidth: CreationTime.width }}
    >
      <span style={{ width: CreationTime.width }}>
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
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

const Deadline: Field = {
  label: "Deadline",
  width: 150,
  renderCell: (data: Task) => {
    const deadlineDate = new Date(data.deadline);
    const isOverdue = deadlineDate < new Date();

    return (
      <Tooltip
        title={deadlineDate.toLocaleString()}
        arrow
        style={{ width: Deadline.width }}
      >
        <Chip
          label={new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(deadlineDate)}
          color={isOverdue ? "error" : "default"}
          size="small"
          variant="outlined"
          style={{ width: Deadline.width }}
        />
      </Tooltip>
    );
  },
  canSort: true,
  canFilter: true,
  isVisible: true,
  accessKey: FieldsAccessKeys.DEADLINE,
};

const LastModifiedTime: Field = {
  label: "Last Modified On",
  width: 150,
  renderCell: (data: Task) => (
    <Tooltip
      title={new Date(data.lastModifiedTime).toLocaleString()}
      arrow
      style={{ width: LastModifiedBy.width }}
    >
      <span style={{ width: LastModifiedTime.width }}>
        {new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(data.lastModifiedTime))}
      </span>
    </Tooltip>
  ),
  canSort: true,
  canFilter: false,
  isVisible: true,
  accessKey: FieldsAccessKeys.LASTMODIFIEDTIME,
};

// FieldsAccessKeys.;

const getTaskTableField = (accessKey: FieldsAccessKeys): Field => {
  switch (accessKey) {
    case FieldsAccessKeys.ID:
      return ID;
    case FieldsAccessKeys.NAME:
      return Name;
    case FieldsAccessKeys.DESCRIPTION:
      return Description;
    case FieldsAccessKeys.STATUS:
      return Status;
    case FieldsAccessKeys.PRIORITY:
      return Priority;
    case FieldsAccessKeys.ASSIGNEDTO:
      return AssignedTo;
    case FieldsAccessKeys.CREATEDBY:
      return CreatedBy;
    case FieldsAccessKeys.LASTMODIFIEDBY:
      return LastModifiedBy;
    case FieldsAccessKeys.CREATIONTIME:
      return CreationTime;
    case FieldsAccessKeys.DEADLINE:
      return Deadline;
    case FieldsAccessKeys.LASTMODIFIEDTIME:
      return LastModifiedTime;
  }
};

const TaskTableConfigs: TableConfigs = {
  columns: TaskTableColumns,
  getTableField: getTaskTableField,
};
export default TaskTableConfigs;
