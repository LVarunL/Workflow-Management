import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, ListItemText } from "@mui/material";
import { Option } from "../../utils/interfaces";
import { QueryKeys } from "../../utils/enums";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
interface DropdownSelectProps {
  options: Option[];
  title?: string;
  width?: number;
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
}

export function DropdownSelect({
  options,
  title,
  width,
  selectedValue,
  setSelectedValue,
}: DropdownSelectProps) {
  useEffect(() => {
    if (options.length > 0 && selectedValue === "")
      setSelectedValue(options[0].value);
  }, [options]);
  return (
    <Box sx={{ minWidth: 120, width: width }}>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
          renderValue={(selected) => {
            const selectedOption = options?.find(
              (option) => option.value === selected
            );
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {selectedOption?.image && <Avatar src={selectedOption.image} />}
                <span>{selectedOption?.name}</span>
              </Box>
            );
          }}
        >
          {options?.map((option) => (
            <MenuItem value={option?.value}>
              {option.image && <Avatar src={option?.image} />}
              <ListItemText
                primary={option?.name}
                secondary={option?.description}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
