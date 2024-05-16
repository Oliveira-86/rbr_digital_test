import { Request, Response } from 'express';
import Employees from "../models/Employee";

export const getEmployees = async (req: Request, res: Response) => {
    const { page } = req.query;
    let pageAsNumber: number;

    if (typeof page === "string") {
        pageAsNumber = parseInt(page);
    } else if (Array.isArray(page) && page.length > 0 && typeof page[0] === "string") {
        pageAsNumber = parseInt(page[0]);
    } else {
        pageAsNumber = NaN;
    }
  
    try {
        if (!pageAsNumber) {
            throw new Error("O parâmetro 'page' é obrigatório.");
        }

        const LIMIT = 6;
        const startIndex = Number(pageAsNumber - 1) * LIMIT;

        const total = await Employees.countDocuments({});
    
        const employees = await Employees.find()
            .sort({ _id: 1 })
            .limit(LIMIT)
            .skip(startIndex);
    
        res
            .status(202)
            .json({
            data: employees,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        });
    } catch (error: any) {
        res.status(500).json({ message: "Ocorreu um erro ao processar a solicitação." });
    }
  };