import { Request, Response } from 'express';
import Employees, { IEmployees } from "../models/Employee";
import { diacriticSensitiveRegex } from '../utils/regex';
import mongoose from 'mongoose';
import { Result } from '../utils/Result';

enum HttpStatusCode {
    OK = 200,
    Create = 201,
    NoContent = 204,
    NotFound = 404,
    InternalServerError = 500,
}

export const getEmployees = async (req: Request<{}, {}, {}, { page: number }>, res: Response) => {
    const { page } = req.query;
 
    try {
        if (!page) {
            throw  new Result(true, HttpStatusCode.NotFound, null, "A paginação é obrigatória.")
        }

        const LIMIT = 10;
        const startIndex = Number(page - 1) * LIMIT;

        const total = await Employees.countDocuments({});

        const employees = await Employees.find()
            .sort({ _id: 1 })
            .limit(LIMIT)
            .skip(startIndex);

        const data = {
            data: employees,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        }

        return new Result(true, HttpStatusCode.OK, data, "Lista de funcionários")
    } catch (error: any) {
        throw new Result(false, HttpStatusCode.InternalServerError, null, error || "Ocorreu um erro ao processar a solicitação.")
    }
};

export const getEmployeesBySearch = async (req: Request<{}, {}, {}, { searchQuery: string }>, res: Response) => {
    const { searchQuery } = req.query;

    const searchSensitiveRegex = diacriticSensitiveRegex(searchQuery);
    
    try {
        if (!searchSensitiveRegex) {
            throw  new Result(true, HttpStatusCode.NotFound, null, "O parâmetro de pesquisa é obrigatório.");
        }

        const employees = await Employees.find({ name: { $regex: searchSensitiveRegex, $options: 'i' } });

        return new Result(true, HttpStatusCode.OK, employees, "Lista de funcionários que foi resultado da pesquisa.")
    } catch (error: any) {
        throw new Result(false, HttpStatusCode.InternalServerError, null, error || "Ocorreu um erro ao processar a solicitação.")
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
            throw  new Result(true, HttpStatusCode.NotFound, null, "Os dados do funionário é obrigatório.");
        }

        await newEmployeeMessage.save();

        return new Result(true, HttpStatusCode.Create, newEmployeeMessage, "Funcionário criado com sucesso.");
    } catch (error: any) {
        throw new Result(false, HttpStatusCode.InternalServerError, null, error || "Ocorreu um erro ao processar a solicitação.")
    }
};

export const updateEmployee = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name, department, position, hireDate }: IEmployees = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw  new Result(true, HttpStatusCode.NotFound, null, `ID inválido: ${id}`);
    }

    try {
        const existingEmployee = await Employees.findById(id);
        if (!existingEmployee) {
            throw  new Result(true, HttpStatusCode.NotFound, null, `Nenhum funcionário encontrado com o ID: ${id}`);
        }
        
        if (name) existingEmployee.name = name;
        if (department) existingEmployee.department = department;
        if (position) existingEmployee.position = position;
        if (hireDate) existingEmployee.hireDate = hireDate;
    
        const updatedEmployee = await existingEmployee.save();
    
        return new Result(true, HttpStatusCode.OK, updatedEmployee, "Funcionário atualizado com sucesso.");
    } catch (error: any) {
        throw new Result(false, HttpStatusCode.InternalServerError, null, error || "Ocorreu um erro ao processar a solicitação.")
    }
};
  

export const deleteEmployee = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        throw  new Result(true, HttpStatusCode.NoContent, null, `ID inválido: ${id}`);

    try {
        const existingEmployee = await Employees.findById(id);
        if (!existingEmployee) {
            throw  new Result(true, HttpStatusCode.NotFound, null, `Nenhum funcionário encontrado com o ID: ${id}`);
        }
    
        const updatedEmployee = await Employees.findByIdAndDelete(id);
    
        return new Result(true, HttpStatusCode.NoContent, updatedEmployee, "Funcionário atualizado com sucesso.");
    } catch (error: any) {
        throw new Result(false, HttpStatusCode.InternalServerError, null, error || "Ocorreu um erro ao processar a solicitação.")
    }
};