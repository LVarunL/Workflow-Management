import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const dayToDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthToMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export function useDateInput() {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const dateInput = (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
  return {
    selectedDate: {
      year: value.get("year"),
      month: value.get("month") + 1,
      date: value.get("date"),
      day: dayToDay[value.get("day")],
      dateString: `${dayToDay[value.get("day")]}, ${value.get("date")} ${
        monthToMonth[value.get("month")]
      }, ${value.get("year")}`,
    },
    dateInput,
  };
}
