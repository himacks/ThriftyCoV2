import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CheckIcon from "@mui/icons-material/Check";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DialogTitle from "@mui/material/DialogTitle";
import {login} from "../helpers";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface AdminLoginProps {
    verify: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({verify}) => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUsername("");
        setPassword("");
        setError(false);
        setHelperText("");
        setOpen(false);
    };

    const handleSubmit = async () => {
        const validated = await login(username, password);
        if (validated) {
            verify();
            handleClose();
        } else {
            setError(true);
            setPassword("");
            setHelperText("Invalid username or password");
        }
    };

    const handleInputChange = (event, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setError(false);
        setHelperText("");
        setter(event.target.value);
    };

    return (
        <div>
            <IconButton
                aria-label="admin login"
                disabled={cookies.get("jwtToken") && true}
                component="label"
                onClick={handleClickOpen}
            >
                {cookies.get("jwtToken") ? (
                    <CheckIcon fontSize="large" className="profile-icon" />
                ) : (
                    <AccountCircleIcon fontSize="large" className="profile-icon" />
                )}
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Admin Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => handleInputChange(e, setUsername)}
                        error={error}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => handleInputChange(e, setPassword)}
                        error={error}
                        helperText={helperText}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminLogin;
