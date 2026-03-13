import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { CategoryPurposeLabel, type Category } from "../../types";
import { getCategories, createCategory } from "../../services/categoryService";
import CategoryModal from "./CategoryModal";
import SnackbarAlert from "../../components/SnackbarAlert";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    useEffect(() => {
        const loadCategories = async () => {
            await fetchCategories();
        };
        loadCategories();
    }, []);

    const handleCreate = async (category: Omit<Category, "id">) => {
        try {
            await createCategory(category);
            setModalOpen(false);
            await fetchCategories();
            setSnackbar({ open: true, message: "Categoria criada com sucesso.", severity: "success" });
        } catch {
            setSnackbar({ open: true, message: "Erro ao criar categoria.", severity: "error" });
        }
    };

    const handleModalError = (message: string) => {
        setSnackbar({ open: true, message, severity: "error" });
    };

    <TableBody>
        {categories.map((category) => {
            console.log([...category.purpose].map(c => c.charCodeAt(0)));
            return (
                <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{CategoryPurposeLabel[category.purpose]}</TableCell>
                </TableRow>
            );
        })}
    </TableBody>

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h5">Categorias</Typography>
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                    Nova Categoria
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Finalidade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>{CategoryPurposeLabel[category.purpose]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CategoryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreate}
                onError={handleModalError}
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