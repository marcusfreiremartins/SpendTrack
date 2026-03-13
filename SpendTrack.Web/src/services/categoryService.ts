import api from "./api";
import type { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("/category");
    return response.data;
};

export const createCategory = async (category: Omit<Category, "id">): Promise<Category> => {
    const response = await api.post("/category", category);
    return response.data;
};