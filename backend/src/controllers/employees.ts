import { Request, Response } from 'express';
import Employees from "../models/Employee";

interface ISearch {
    searchQuery: string;
}

interface IPage {
    page: number;
}

export const getEmployees = async (req: Request<{}, {}, {}, IPage>, res: Response) => {
    const { page } = req.query;
 

    try {
        if (!page) {
            throw new Error("O parâmetro 'page' é obrigatório.");
        }

        const LIMIT = 6;
        const startIndex = Number(page - 1) * LIMIT;

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

export const getEmployeesBySearch = async (req: Request<{}, {}, {}, ISearch>, res: Response) => {
    const { searchQuery } = req.query;

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    
    const searchQueryWithoutAccents = normalizeString(searchQuery);
    
    try {
        if (!searchQueryWithoutAccents) {
            throw new Error("O parâmetro de pesquisa é obrigatório.");
        }

        const name = new RegExp(searchQueryWithoutAccents, "i");

        const employees = await Employees.find({ name });

        res.json({ employees });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};