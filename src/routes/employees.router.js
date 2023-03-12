import { Router } from 'express';
import { 
    getEmployees, 
    getEmployeeByID,
    getEmployeeByEmail,
    createEmployee,
    deleteEmployee,
    updateEmployee
} from '../services/employees.service.js';

const router = Router();

router.get('/', getEmployees);

router.get('/:id', getEmployeeByID);

router.get('/email/:email', getEmployeeByEmail);

router.post('/', createEmployee);

router.delete('/:id', deleteEmployee);

router.put('/', updateEmployee);

export default router;