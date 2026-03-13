import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { CategoryPurpose } from "../../types";
import type { Category } from "../../types";

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (category: Omit<Category, "id">) => void;
    onError: (message: string) => void;
}

export default function CategoryModal({ open, onClose, onSubmit, onError }: CategoryModalProps) {
    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState<CategoryPurpose>(CategoryPurpose.Expense);

    const handleSubmit = () => {
        if (!description.trim()) {
            onError("Todos os campos precisam ser preenchidos.");
            return;
        }
        onSubmit({ description, purpose });
        setDescription("");
        setPurpose(CategoryPurpose.Expense);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    inputProps={{ maxLength: 400 }}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Finalidade</InputLabel>
                    <Select
                        value={purpose}
                        label="Finalidade"
                        onChange={(e) => setPurpose(e.target.value as CategoryPurpose)}
                    >
                        <MenuItem value={CategoryPurpose.Expense}>Despesa</MenuItem>
                        <MenuItem value={CategoryPurpose.Income}>Receita</MenuItem>
                        <MenuItem value={CategoryPurpose.Both}>Ambas</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}