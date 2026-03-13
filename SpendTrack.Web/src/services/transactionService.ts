import api from "./api";
import type { Transaction, CreateTransactionDto } from "../types";

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get("/transaction");
    return response.data;
};

export const createTransaction = async (transaction: CreateTransactionDto): Promise<Transaction> => {
    const response = await api.post("/transaction", transaction);
    return response.data;
};