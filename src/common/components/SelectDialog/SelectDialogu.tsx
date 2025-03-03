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
import MyInputs from "../Inputs/Inputs";
import { Option } from "../../utils/interfaces";

interface SelectDialogProps {
  title: string;
  options: Option[];
  defaultOpen: boolean;
  onSubmit: () => void;
  addButton?: boolean;
  AddForm?: React.FC;
}

export function useSelectDialog({
  title,
  options,
  defaultOpen = false,
  onSubmit,
  addButton = false,
  AddForm,
}: SelectDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { dropdown, selectedValue } = MyInputs.useDropDownSelect({
    options,
    title,
  });
  const dialog = open && (
    <Dialog open onClose={() => setOpen(false)}>
      <DialogTitle>Select {title}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexWrap: "wrap", minWidth: 300 }}
        >
          <FormControl sx={{ m: 2, minWidth: 300 }}>{dropdown}</FormControl>
          {addButton && <AddForm></AddForm>}
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
