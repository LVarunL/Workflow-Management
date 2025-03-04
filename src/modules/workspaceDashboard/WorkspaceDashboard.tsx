import React from "react";
import { useLocation, useSearchParams } from "react-router";
import MyInputs from "../../common/components/Inputs/Inputs";
import { Option } from "../../common/utils/interfaces";
import { TaskStatus } from "../../common/utils/enums";

export default function WorkspaceDashboard() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const options: Option[] = [
    {
      name: TaskStatus.NOT_STARTED,
      //   description: "Desc1",
      value: "i1",
    },
    {
      name: TaskStatus.IN_PROGRESS,
      //   description: "Desc2",
      value: "i2",
    },
    {
      name: TaskStatus.IN_REVIEW,
      //   description: "Desc3",
      value: "i3",
    },
    {
      name: TaskStatus.COMPLETED,
      //   description: "Desc4",
      value: "i4",
    },
  ];

  const { viewType, viewTypeToggle } = MyInputs.useViewTypeToggle();
  const { dateInput, selectedDate } = MyInputs.useDateInput();
  const { searchBar, searchQuery } = MyInputs.useSearchBar({
    placeholder: "Search among workspace",
    width: 250,
    onSearch: (query) => {},
  });
  console.log(searchParams.get("lemon"));
  console.log(location);
  return (
    <div>
      WorkspaceDashboard {location.pathname}
      <div></div>
      {dateInput}
      <div>{selectedDate.dateString}</div>
      {viewTypeToggle}
      {viewType}
      {searchBar}
      {searchQuery}
    </div>
  );
}
