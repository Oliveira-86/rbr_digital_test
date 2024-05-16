import  express  from "express";

import { getEmployees } from "../controllers/employees";

const router = express.Router();

router.get('/', getEmployees);

export default router;