import  express  from "express";

import { getEmployees, getEmployeesBySearch, createEmployee } from "../controllers/employees";

const router = express.Router();

router.get('/', getEmployees);
router.get('/search', getEmployeesBySearch);
router.post('/', createEmployee);

export default router;