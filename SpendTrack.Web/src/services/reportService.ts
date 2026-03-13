import api from "./api";
import type { ReportSummaryDto, CategoryReportSummaryDto } from "../types";

export const getReportByPersons = async (): Promise<ReportSummaryDto> => {
    const response = await api.get("/report/persons");
    return response.data;
};

export const getReportByCategories = async (): Promise<CategoryReportSummaryDto> => {
    const response = await api.get("/report/categories");
    return response.data;
};