import React, { useState } from "react";
import {
  Box,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Avatar,
  ListItemText,
} from "@mui/material";
import MyButtons from "../Buttons/Buttons";
interface Option {
  value: string;
  name: string;
  description?: string;
  image?: string;
}

interface SelectDialogProps {
  title: string;
  options: Option[];
  defaultOpen: boolean;
  onSubmit: () => void;
}

export function useSelectDialog({
  title,
  options,
  defaultOpen = false,
  onSubmit,
}: SelectDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const dialog = open && (
    <Dialog open onClose={() => setOpen(false)}>
      <DialogTitle>Select {title}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexWrap: "wrap", minWidth: 300 }}
        >
          <FormControl sx={{ m: 2, minWidth: 300 }}>
            <Select
              value={selectedValue}
              onChange={(event) => setSelectedValue(event.target.value)}
              renderValue={(selected) => {
                const selectedOption = options.find(
                  (option) => option.value === selected
                );
                return (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {selectedOption?.image && (
                      <Avatar src={selectedOption.image} />
                    )}
                    <span>{selectedOption?.name}</span>
                  </Box>
                );
              }}
            >
              {options.map((option) => (
                <MenuItem value={option.value}>
                  {option.image && <Avatar src={option.image} />}
                  <ListItemText
                    primary={option.name}
                    secondary={option.description}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <MyButtons.CloseModalButton
          text="Cancel"
          onClick={() => setOpen(false)}
        ></MyButtons.CloseModalButton>
        <MyButtons.SubmitButton
          text="OK"
          onClick={() => {
            setOpen(false);
            onSubmit();
          }}
        ></MyButtons.SubmitButton>
      </DialogActions>
    </Dialog>
  );

  return { dialog, selectedValue, setOpen };
}
