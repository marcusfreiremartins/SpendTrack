import { Alert, Snackbar } from "@mui/material";

interface SnackbarAlertProps {
    open: boolean;
    message: string;
    severity?: "success" | "error";
    onClose: () => void;
}

export default function SnackbarAlert({ open, message, severity = "success", onClose }: SnackbarAlertProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}