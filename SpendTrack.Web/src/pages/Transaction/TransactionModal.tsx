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
import { useEffect, useState } from "react";
import { CategoryPurpose, TransactionType } from "../../types";
import type { Category, Person, CreateTransactionDto } from "../../types";
import { getCategories } from "../../services/categoryService";
import { getPersons } from "../../services/personService";

interface TransactionModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (transaction: CreateTransactionDto) => void;
    onError: (message: string) => void;
}

export default function TransactionModal({ open, onClose, onSubmit, onError }: TransactionModalProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [type, setType] = useState<TransactionType>(TransactionType.Expense);
    const [categoryId, setCategoryId] = useState<number | "">("");
    const [personId, setPersonId] = useState<number | "">("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const [categoriesData, personsData] = await Promise.all([
                getCategories(),
                getPersons(),
            ]);
            setCategories(categoriesData);
            setPersons(personsData);
        };
        if (open) loadData();
    }, [open]);

    const filteredCategories = categories.filter((c) => {
        if (type === TransactionType.Expense)
            return c.purpose === CategoryPurpose.Expense || c.purpose === CategoryPurpose.Both;
        if (type === TransactionType.Income)
            return c.purpose === CategoryPurpose.Income || c.purpose === CategoryPurpose.Both;
        return true;
    });

    const handleTypeChange = (newType: TransactionType) => {
        setType(newType);
        setCategoryId("");
    };

    const handleSubmit = () => {
        if (!description.trim() || amount === "" || categoryId === "" || personId === "") {
            onError("Todos os campos precisam ser preenchidos.");
            return;
        }
        onSubmit({
            description,
            amount: Number(amount),
            type,
            categoryId: Number(categoryId),
            personId: Number(personId),
        });
        setDescription("");
        setAmount("");
        setType(TransactionType.Expense);
        setCategoryId("");
        setPersonId("");
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nova Transação</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    inputProps={{ maxLength: 400 }}
                    fullWidth
                />
                <TextField
                    label="Valor"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                    inputProps={{ min: 0 }}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={type}
                        label="Tipo"
                        onChange={(e) => handleTypeChange(e.target.value as TransactionType)}
                    >
                        <MenuItem value={TransactionType.Expense}>Despesa</MenuItem>
                        <MenuItem value={TransactionType.Income}>Receita</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                        value={categoryId}
                        label="Categoria"
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                        {filteredCategories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.description}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Pessoa</InputLabel>
                    <Select
                        value={personId}
                        label="Pessoa"
                        onChange={(e) => setPersonId(Number(e.target.value))}
                    >
                        {persons.map((person) => (
                            <MenuItem key={person.id} value={person.id}>
                                {person.name}
                            </MenuItem>
                        ))}
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