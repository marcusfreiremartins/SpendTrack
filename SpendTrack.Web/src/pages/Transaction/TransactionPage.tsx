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
import { type Transaction, type CreateTransactionDto, TransactionTypeLabel } from "../../types";
import { getTransactions, createTransaction } from "../../services/transactionService";
import TransactionModal from "./TransactionModal";
import SnackbarAlert from "../../components/SnackbarAlert";

export default function TransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await getTransactions();
            setTransactions(data);
        };
        loadTransactions();
    }, []);

    const fetchTransactions = async () => {
        const data = await getTransactions();
        setTransactions(data);
    };

    const handleCreate = async (transaction: CreateTransactionDto) => {
        try {
            await createTransaction(transaction);
            setModalOpen(false);
            await fetchTransactions();
            setSnackbar({ open: true, message: "Transação criada com sucesso.", severity: "success" });
        } catch {
            setSnackbar({ open: true, message: "Erro ao criar transação.", severity: "error" });
        }
    };

    const handleModalError = (message: string) => {
        setSnackbar({ open: true, message, severity: "error" });
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h5">Transações</Typography>
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                    Nova Transação
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Pessoa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                    {transaction.amount.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </TableCell>
                                <TableCell>{TransactionTypeLabel[transaction.type]}</TableCell>
                                <TableCell>{transaction.category.description}</TableCell>
                                <TableCell>{transaction.person.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TransactionModal
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