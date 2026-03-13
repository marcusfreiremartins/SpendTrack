import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    personName: string;
}

export default function DeleteConfirmModal({ open, onClose, onConfirm, personName }: DeleteConfirmModalProps) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography>
                    Tem certeza que deseja excluir <strong>{personName}</strong>? Todas as transações dessa pessoa também serão excluídas.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={onConfirm} variant="contained" color="error">Excluir</Button>
            </DialogActions>
        </Dialog>
    );
}