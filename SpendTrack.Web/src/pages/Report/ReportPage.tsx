import { useEffect, useState } from "react";
import {
    Container,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import type { ReportSummaryDto, CategoryReportSummaryDto } from "../../types";
import { getReportByPersons, getReportByCategories } from "../../services/reportService";

export default function ReportPage() {
    const [tab, setTab] = useState(0);
    const [personReport, setPersonReport] = useState<ReportSummaryDto | null>(null);
    const [categoryReport, setCategoryReport] = useState<CategoryReportSummaryDto | null>(null);

    useEffect(() => {
        const loadReports = async () => {
            const [personData, categoryData] = await Promise.all([
                getReportByPersons(),
                getReportByCategories(),
            ]);
            setPersonReport(personData);
            setCategoryReport(categoryData);
        };
        loadReports();
    }, []);

    const formatCurrency = (value: number) =>
        value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Relatórios</Typography>

            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
                <Tab label="Por Pessoa" />
                <Tab label="Por Categoria" />
            </Tabs>

            {/* Relatório por Pessoa */}
            {tab === 0 && personReport && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Receitas</TableCell>
                                <TableCell align="right">Despesas</TableCell>
                                <TableCell align="right">Saldo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {personReport.persons.map((p) => (
                                <TableRow key={p.personId}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell align="right">{formatCurrency(p.totalIncome)}</TableCell>
                                    <TableCell align="right">{formatCurrency(p.totalExpense)}</TableCell>
                                    <TableCell align="right"
                                        sx={{ color: p.balance >= 0 ? "green" : "red", fontWeight: "bold" }}>
                                        {formatCurrency(p.balance)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {/* Total geral */}
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>Total Geral</TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {formatCurrency(personReport.totalIncome)}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {formatCurrency(personReport.totalExpense)}
                                </TableCell>
                                <TableCell align="right"
                                    sx={{
                                        fontWeight: "bold",
                                        color: personReport.balance >= 0 ? "green" : "red"
                                    }}>
                                    {formatCurrency(personReport.balance)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Relatório por Categoria */}
            {tab === 1 && categoryReport && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Categoria</TableCell>
                                <TableCell align="right">Receitas</TableCell>
                                <TableCell align="right">Despesas</TableCell>
                                <TableCell align="right">Saldo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryReport.categories.map((c) => (
                                <TableRow key={c.categoryId}>
                                    <TableCell>{c.description}</TableCell>
                                    <TableCell align="right">{formatCurrency(c.totalIncome)}</TableCell>
                                    <TableCell align="right">{formatCurrency(c.totalExpense)}</TableCell>
                                    <TableCell align="right"
                                        sx={{ color: c.balance >= 0 ? "green" : "red", fontWeight: "bold" }}>
                                        {formatCurrency(c.balance)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {/* Total geral */}
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>Total Geral</TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {formatCurrency(categoryReport.totalIncome)}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {formatCurrency(categoryReport.totalExpense)}
                                </TableCell>
                                <TableCell align="right"
                                    sx={{
                                        fontWeight: "bold",
                                        color: categoryReport.balance >= 0 ? "green" : "red"
                                    }}>
                                    {formatCurrency(categoryReport.balance)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}