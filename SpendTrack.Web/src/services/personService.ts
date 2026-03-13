import api from "./api";
import type { Person } from "../types";

export const getPersons = async (): Promise<Person[]> => {
    const response = await api.get("/person");
    return response.data;
};

export const getPersonById = async (id: number): Promise<Person> => {
    const response = await api.get(`/person/${id}`);
    return response.data;
};

export const createPerson = async (person: Omit<Person, "id" | "deletionDate">): Promise<Person> => {
    const response = await api.post("/person", person);
    return response.data;
};

export const updatePerson = async (id: number, person: Omit<Person, "id" | "deletionDate">): Promise<Person> => {
    const response = await api.put(`/person/${id}`, person);
    return response.data;
};

export const deletePerson = async (id: number): Promise<void> => {
    await api.delete(`/person/${id}`);
};