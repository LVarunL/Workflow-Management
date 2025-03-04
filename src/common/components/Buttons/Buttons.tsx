import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
  width = 250,
  fontSize = 12,
  height = 20,
}: {
  text?: string;
  onClick?: () => void;
  width?: number;
  fontSize?: number;
  height?: number;
}) => (
  <Button
    variant="outlined"
    startIcon={<AddIcon />}
    onClick={onClick}
    sx={{ width: width, height: height }}
  >
    <Typography fontSize={fontSize}>{text}</Typography>
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

const InviteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<PersonAddIcon />}
      onClick={onClick}
    >
      Invite People
    </Button>
  );
};

const MyButtons = {
  SubmitButton,
  AddButton,
  DeleteButton,
  TableDeleteButton,
  ProfileButton,
  SettingsButton,
  CloseModalButton,
  CloseModalIcon,
  InviteButton,
};

export default MyButtons;
