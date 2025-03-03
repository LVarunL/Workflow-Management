import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ViewType } from "../../utils/enums";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Typography } from "@mui/material";
export function useViewTypeToggle() {
  const [viewType, setViewType] = useState<ViewType>(ViewType.TABLE);

  const handleSelect = function (e, newValue) {
    if (newValue !== null) {
      setViewType(newValue);
    }
  };
  const viewTypeToggle = (
    <Stack direction="row" spacing={4}>
      <ToggleButtonGroup value={viewType} exclusive onChange={handleSelect}>
        <ToggleButton
          value={ViewType.TABLE}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 80,
            height: 50,
          }}
        >
          <TableViewIcon />
          <Typography fontSize={10}>{ViewType.TABLE}</Typography>
        </ToggleButton>
        <ToggleButton
          value={ViewType.KANBAN}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 80,
            height: 50,
          }}
        >
          <ViewKanbanIcon />
          <Typography fontSize={10}>{ViewType.KANBAN}</Typography>
        </ToggleButton>
        <ToggleButton
          value={ViewType.CALENDAR}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 80,
            height: 50,
          }}
        >
          <CalendarMonthIcon />
          <Typography fontSize={10}>{ViewType.CALENDAR}</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
  return {
    viewType,
    viewTypeToggle,
  };
}
