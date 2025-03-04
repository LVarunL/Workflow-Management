import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, ListItemText } from "@mui/material";
import { Option } from "../../utils/interfaces";
import { Dispatch, SetStateAction } from "react";

interface DropdownSelectProps {
  options: Option[];
  title?: string;
  width?: number;
  selectedOption: Option;
  setSelectedOption: Dispatch<SetStateAction<Option>>;
}

export function DropdownSelect({
  options,
  title,
  width,
  selectedOption,
  setSelectedOption,
}: DropdownSelectProps) {
  useEffect(() => {
    if (options.length > 0 && selectedOption.value === "") {
      setSelectedOption(options[0]);
    }
  }, [options]);

  return (
    <Box sx={{ minWidth: 100, width: width }}>
      <FormControl fullWidth>
        <Select
          value={selectedOption?.value}
          sx={{ height: 40 }}
          onChange={(event) => {
            const newOption = options.find(
              (opt) => opt.value === event.target.value
            );
            if (newOption) setSelectedOption(newOption);
          }}
          renderValue={() => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selectedOption?.image && (
                <Avatar
                  src={selectedOption.image}
                  sx={{ height: 24, width: 24 }}
                />
              )}
              <span>{selectedOption?.name}</span>
            </Box>
          )}
          MenuProps={{
            MenuListProps: {
              sx: {
                maxHeight: 200,
                overflow: "auto",
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ height: 40 }}
            >
              {option.image && (
                <Avatar src={option.image} sx={{ height: 24, width: 24 }} />
              )}
              <ListItemText
                primary={option.name}
                // secondary={option.description}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
