import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import MyButtons from "../Buttons/Buttons";
import MyInputs from "../Inputs/Inputs";
import { Option } from "../../utils/interfaces";

interface SelectDialogProps {
  title: string;
  options: Option[];
  defaultOpen?: boolean;
  onSubmit: () => void;
  addButton?: boolean;
  AddForm?: React.FC<{ onClose: () => void }>;
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
  const [showAddForm, setShowAddForm] = useState(false);
  const { dropdown, selectedValue } = MyInputs.useDropDownSelect({
    options,
    title,
  });

  const dialog = open && (
    <Dialog open onClose={() => setOpen(false)}>
      <DialogTitle>
        {showAddForm ? `Create ${title}` : `Select ${title}`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            flexDirection: "column",
            gap: 2,
          }}
        >
          {!showAddForm ? (
            <>
              <FormControl sx={{ minWidth: 300 }}>{dropdown}</FormControl>
              {addButton && (
                <div>
                  <MyButtons.AddButton
                    text={`Create New ${title}`}
                    onClick={() => setShowAddForm(true)}
                    width={300}
                  ></MyButtons.AddButton>
                </div>
              )}
            </>
          ) : (
            AddForm && <AddForm onClose={() => setShowAddForm(false)} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {!showAddForm ? (
          <>
            <MyButtons.CloseModalButton
              text="Cancel"
              onClick={() => setOpen(false)}
            />
            <MyButtons.SubmitButton
              text="OK"
              onClick={() => {
                setOpen(false);
                onSubmit();
              }}
            />
          </>
        ) : null}
      </DialogActions>
    </Dialog>
  );

  return { dialog, selectedValue, setOpen };
}
