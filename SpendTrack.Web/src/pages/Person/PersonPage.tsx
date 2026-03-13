import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Person } from "../../types";
import { getPersons, createPerson, updatePerson, deletePerson } from "../../services/personService";
import PersonModal from "./PersonModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import SnackbarAlert from "../../components/SnackbarAlert";

export default function PersonPage() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const handleModalError = (message: string) => { setSnackbar({ open: true, message, severity: "error" });};

    useEffect(() => {
        const loadPersons = async () => {
            const data = await getPersons();
            setPersons(data);
        };
        loadPersons();
    }, []);

    const fetchPersons = async () => {
        const data = await getPersons();
        setPersons(data);
    };

    const handleCreate = async (person: Omit<Person, "id" | "deletionDate">) => {
        try {
            await createPerson(person);
            setModalOpen(false);
            setSnackbar({ open: true, message: "Pessoa criada com sucesso.", severity: "success" });
            await fetchPersons();
        }
        catch {
            setSnackbar({ open: true, message: "Erro ao criar pessoa.", severity: "error" });
        }
    };

    const handleUpdate = async (person: Omit<Person, "id" | "deletionDate">) => {
        try {
            if (!selectedPerson) return;
            await updatePerson(selectedPerson.id, person);
            setModalOpen(false);
            setSelectedPerson(null);
            setSnackbar({ open: true, message: "Pessoa atualizada com sucesso.", severity: "success" });
            await fetchPersons();
        }
        catch {
            setSnackbar({ open: true, message: "Erro ao atualizar pessoa.", severity: "error" });
        }
    };

    const handleDelete = async () => {
        try {
            if (!selectedPerson) return;
            await deletePerson(selectedPerson.id);
            setDeleteModalOpen(false);
            setSelectedPerson(null);
            setSnackbar({ open: true, message: "Pessoa excluida com sucesso.", severity: "success" });
            await fetchPersons();
        }
        catch {
            setSnackbar({ open: true, message: "Erro ao excluir pessoa.", severity: "error" });
        }
    };

    const handleOpenEdit = (person: Person) => {
        setSelectedPerson(person);
        setModalOpen(true);
    };

    const handleOpenDelete = (person: Person) => {
        setSelectedPerson(person);
        setDeleteModalOpen(true);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h5">Pessoas</Typography>
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                    Nova Pessoa
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.id}</TableCell>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.age}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleOpenEdit(person)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleOpenDelete(person)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <PersonModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedPerson(null);
                }}
                onSubmit={selectedPerson ? handleUpdate : handleCreate}
                onError={handleModalError}
                person={selectedPerson}
            />

            <DeleteConfirmModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedPerson(null);
                }}
                onConfirm={handleDelete}
                personName={selectedPerson?.name ?? ""}
            />

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Container>
    );
}