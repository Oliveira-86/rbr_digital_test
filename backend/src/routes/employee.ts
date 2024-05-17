import  express  from "express";

import { getEmployees, getEmployeesBySearch, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employees";

const router = express.Router();

router.get('/', getEmployees);
router.get('/search', getEmployeesBySearch);
router.post('/', createEmployee);
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router;