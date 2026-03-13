export enum CategoryPurpose {
    Expense = "Expense",
    Income = "Income",
    Both = "Both"
}

export enum TransactionType {
    Expense = "Expense",
    Income = "Income"
}

export const CategoryPurposeLabel: Record<CategoryPurpose, string> = {
    [CategoryPurpose.Expense]: "Despesa",
    [CategoryPurpose.Income]: "Receita",
    [CategoryPurpose.Both]: "Ambos",
};

export const TransactionTypeLabel: Record<TransactionType, string> = {
    [TransactionType.Expense]: "Despesa",
    [TransactionType.Income]: "Receita",
};

export interface Category {
    id: number;
    description: string;
    purpose: CategoryPurpose;
}

export interface Person {
    id: number;
    name: string;
    age: number;
    deletionDate?: string;
}

export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    category: Category;
    personId: number;
    person: Person;
    deletionDate?: string;
}

export interface CreateTransactionDto {
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    personId: number;
}

export interface PersonTotalsDto {
    personId: number;
    name: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface ReportSummaryDto {
    persons: PersonTotalsDto[];
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface CategoryTotalsDto {
    categoryId: number;
    description: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface CategoryReportSummaryDto {
    categories: CategoryTotalsDto[];
    totalIncome: number;
    totalExpense: number;
    balance: number;
}