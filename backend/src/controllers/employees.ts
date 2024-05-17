import { Request, Response } from 'express';
import Employees, { IEmployees } from "../models/Employee";
import { diacriticSensitiveRegex } from '../utils/regex';
import mongoose from 'mongoose';

export const getEmployees = async (req: Request<{}, {}, {}, { page: number }>, res: Response) => {
    const { page } = req.query;
 
    try {
        if (!page) {
            throw new Error("O parâmetro 'page' é obrigatório.");
        }

        const LIMIT = 10;
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

export const getEmployeesBySearch = async (req: Request<{}, {}, {}, { searchQuery: string }>, res: Response) => {
    const { searchQuery } = req.query;

    const searchSensitiveRegex = diacriticSensitiveRegex(searchQuery);
    
    try {
        if (!searchSensitiveRegex) {
            throw new Error("O parâmetro de pesquisa é obrigatório.");
        }

        const employees = await Employees.find({ name: { $regex: searchSensitiveRegex, $options: 'i' } });

        res.json({ employees });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createEmployee = async (req: Request<IEmployees>, res: Response) => {
    const employee = req.body;

    const newEmployeeMessage = new Employees({
        ...employee,
        createdAt: new Date().toISOString(),
    });

    try {
        if (!newEmployeeMessage) {
            throw new Error("Os dados do funionário é obrigatório é obrigatório.");
        }
        await newEmployeeMessage.save();

        res.status(201).json(newEmployeeMessage);
    } catch (error: any) {
        res.status(500).json({ message: "Ocorreu um erro ao processar a solicitação." });
    }
};

export const updateEmployee = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name, department, position, hireDate }: IEmployees = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `ID inválido: ${id}` });
    }

    try {
        const existingEmployee = await Employees.findById(id);
        if (!existingEmployee) {
            return res.status(404).json({ message: `Nenhum funcionário encontrado com o ID: ${id}` });
        }
        
        if (name) existingEmployee.name = name;
        if (department) existingEmployee.department = department;
        if (position) existingEmployee.position = position;
        if (hireDate) existingEmployee.hireDate = hireDate;
    
        const updatedEmployee = await existingEmployee.save();
    
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro ao processar a solicitação." });
    }
};
  

export const deleteEmployee = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    try {
        const existingEmployee = await Employees.findById(id);
        if (!existingEmployee) {
            return res.status(404).json({ message: `Nenhum funcionário encontrado com o ID: ${id}` });
        }
    
        const updatedEmployee = await Employees.findByIdAndDelete(id);
    
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro ao processar a solicitação." });
    }
};