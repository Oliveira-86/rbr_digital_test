import express from 'express'

import {
  getEmployees,
  getEmployeesBySearch,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employees'

const router = express.Router()

router.get('/', getEmployees)
router.get('/search', getEmployeesBySearch)
router.get('/:id', getEmployeeById)
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router
