import sql from '../database.js';

async function getEmployees(req, res) {
    try {
        const employees = await sql.query("select * from employees");
        res.json(employees['rows'])
    } catch (error) {
        res.status(500).json({
            message: 'internal error',
            error
        });
    }
}

async function getEmployeeByID(req, res) {
    const { id } = req.params;
    try {
        const employee = await sql.query('select * from employees where id_employee = $1', [id]);
        employee['rowCount']
        ? res.json({
            message: 'success',
            ...employee['rows'][0]
        })
        : res.status(404).json({
            message: 'employee not found'
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal error',
            error
        });
    }
}

async function getEmployeeByEmail(req, res) {
    const { email } = req.params;
    try {
        const employee = await sql.query('select * from employees where email = $1', [email]);
        employee['rowCount']
        ? res.json({
            message: 'success',
            ...employee['rows']
        })
        : res.status(404).json({
            message: 'employee not found'
        })
    } catch (error) {
        res.status(500).json({
            message: 'internal error',
            error
        });
    }
}

async function createEmployee(req, res) {    
    const { name, lastname, email } = req.body;
    try {
        const employee = await sql.query('insert into employees(name, lastname, email) values($1, $2, $3) returning name, lastname, email', [name, lastname, email]);
        res.status(201).json({
            message: 'created',
            employee: employee['rows'][0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal error',
            error
        });
    }
}

async function deleteEmployee(req, res) {
    const { id } = req.params;
    try {
        const employee = await sql.query('delete from employees where id_employee = $1', [id]);
        employee['rowCount']
        ? res.status(202).json({
            message: 'employee deleted'
        })
        : res.status(404).json({
            message: 'employee not found'
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal error',
            error
        });
    }
}

async function updateEmployee(req, res) {
    const { id, name, lastname, email } = req.body;
    try {
        const query = 'update employees set name = $1, lastname = $2, email = $3 where id_employee = $4';
        const employee = await sql.query(query, [name, lastname, email, id]);
        employee.rowCount
        ? res.json({
            message: 'updated employee'
        })
        : res.status(404).json({
            message: 'employee not found'
        });
    } catch (error) {
        res.status(500).json({
            message: 'internal error',
            error
        });
    }
}

export { 
    getEmployees, 
    getEmployeeByID, 
    getEmployeeByEmail, 
    createEmployee, 
    deleteEmployee,
    updateEmployee,
 };