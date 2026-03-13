import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Person } from "../../types";

interface PersonModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (person: Omit<Person, "id" | "deletionDate">) => void;
    onError: (message: string) => void;
    person: Person | null;
}


export default function PersonModal({ open, onClose, onSubmit, onError, person }: PersonModalProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");


    useEffect(() => {
        const loadPerson = () => {
            if (person) {
                setName(person.name);
                setAge(person.age);
            } else {
                setName("");
                setAge("");
            }
        };
        loadPerson();
    }, [person, open]);

    const handleSubmit = () => {
        if (!name.trim() || age === "") {
            onError("Todos os campos precisam ser preenchidos.");
            return;
        }
        onSubmit({ name, age: Number(age) });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{person ? "Editar Pessoa" : "Nova Pessoa"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 200 }}
                    fullWidth
                />
                <TextField
                    label="Idade"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                    onKeyDown={(evt) => ["e", "E", "+", "-", ".", ","].includes(evt.key) && evt.preventDefault()}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}