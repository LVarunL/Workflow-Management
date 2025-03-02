import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

const SubmitButton = ({
  text = "Submit",
  onClick,
  disabled,
}: {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Button
    variant="contained"
    color="primary"
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </Button>
);

const AddButton = ({
  text = "Add",
  onClick,
}: {
  text?: string;
  onClick?: () => void;
}) => (
  <Button variant="outlined" startIcon={<AddIcon />} onClick={onClick}>
    {text}
  </Button>
);

const DeleteButton = ({ text = "Delete" }: { text?: string }) => (
  <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
    {text}
  </Button>
);

const TableDeleteButton = () => (
  <IconButton color="error">
    <DeleteIcon />
  </IconButton>
);

const ProfileButton = () => (
  <IconButton color="default">
    <AccountCircleIcon />
  </IconButton>
);

const SettingsButton = () => (
  <IconButton color="default">
    <SettingsIcon />
  </IconButton>
);

const CloseModalButton = ({
  text = "Delete",
  onClick,
}: {
  text?: string;
  onClick?: () => void;
}) => (
  <Button variant="text" color="error" onClick={onClick}>
    {text}
  </Button>
);
const CloseModalIcon = () => (
  <IconButton color="error">
    <CloseIcon />
  </IconButton>
);

const MyButtons = {
  SubmitButton,
  AddButton,
  DeleteButton,
  TableDeleteButton,
  ProfileButton,
  SettingsButton,
  CloseModalButton,
  CloseModalIcon,
};

export default MyButtons;
