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
import { QueryKeys } from "../../utils/enums";

interface SelectDialogProps {
  title: string;
  options: Option[];
  defaultOpen?: boolean;
  canClose?: boolean;
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
  canClose = true,
}: SelectDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  // const DropdownSelect = MyInputs.useDropDownSelect
  //   options,
  //   title,
  //   selectedValue,
  //   setSelectedValue,
  // });

  const DropdownSelect = MyInputs.DropdownSelect;

  const dialog = open && (
    <Dialog
      open
      onClose={() => {
        if (canClose) {
          setOpen(false);
        }
      }}
    >
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
              <FormControl sx={{ minWidth: 300 }}>
                <DropdownSelect
                  options={options}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                />
              </FormControl>
              {addButton && (
                <div>
                  <MyButtons.AddButton
                    text={`Create New ${title}`}
                    onClick={() => setShowAddForm(true)}
                    width={300}
                    height={20}
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
            {canClose && (
              <MyButtons.CloseModalButton
                text="Cancel"
                onClick={() => {
                  if (canClose) {
                    setOpen(false);
                  }
                }}
              />
            )}
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
