import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
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
  const [selectedOption, setselectedOption] = useState<Option>({
    name: "",
    value: "",
  });
  // const DropdownSelect = MyInputs.useDropDownSelect
  //   options,
  //   title,
  //   selectedOption,
  //   setselectedOption,
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
                  selectedOption={selectedOption}
                  setSelectedOption={setselectedOption}
                />
              </FormControl>
              {addButton && (
                <MyButtons.AddButton
                  text={`Create New ${title}`}
                  onClick={() => setShowAddForm(true)}
                  width={300}
                  height={20}
                ></MyButtons.AddButton>
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

  return { dialog, selectedOption, setOpen };
}
