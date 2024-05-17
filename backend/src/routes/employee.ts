import  express  from "express";

import { getEmployees, getEmployeesBySearch } from "../controllers/employees";

const router = express.Router();

router.get('/', getEmployees);
router.get('/search', getEmployeesBySearch);

export default router;