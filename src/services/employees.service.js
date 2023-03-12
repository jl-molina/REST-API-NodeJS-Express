import sql from '../database.js';

async function getEmployees(req, res) {
    const employees = await sql.query("select * from employees");
    employees
    ? res.json(employees['rows'])
    : res.status(500).json({
        message: 'internal error'
    });
    return employees;
}

async function getEmployeeByID(req, res) {
    const { id } = req.params;
    const employee = await sql.query('select * from employees where id_employee = $1', [id]);
    employee['rowCount']
    ? res.json({
        message: 'success',
        ...employee['rows'][0]
    })
    : res.status(404).json({
        message: 'employee not found'
    });
    return employee;
}

async function getEmployeeByEmail(req, res) {
    const { email } = req.params;
    const employee = await sql.query('select * from employees where email = $1', [email]);
    employee['rowCount']
    ? res.json({
        message: 'success',
        ...employee['rows']
    })
    : res.status(404).json({
        message: 'employee not found'
    })

    return employee;
}

async function createEmployee(req, res) {    
    const { name, lastname, email } = req.body;
    const employee = await sql.query('insert into employees(name, lastname, email) values($1, $2, $3) returning name, lastname, email', [name, lastname, email]);
    employee['rowCount']
    ? res.status(201).json({
        message: 'created',
        employee: employee['rows'][0]
    })
    : res.status(500).json({
        message: 'internal error'
    });
    
    return employee;
}

async function deleteEmployee(req, res) {
    const { id } = req.params;
    const employee = await sql.query('delete from employees where id_employee = $1', [id]);
    employee['rowCount']
    ? res.status(202).json({
        message: 'employee deleted'
    })
    : res.status(404).json({
        message: 'employee not found'
    });
    
    return employee;
}

async function updateEmployee(req, res) {
    const { id, name, lastname, email } = req.body;
    const query = 'update employees set name = $1, lastname = $2, email = $3 where id_employee = $4';
    const employee = await sql.query(query, [name, lastname, email, id]);
    employee.rowCount
    ? res.json({
        message: 'updated employee'
    })
    : res.status(404).json({
        message: 'employee not found'
    });
    return employee;
}

export { 
    getEmployees, 
    getEmployeeByID, 
    getEmployeeByEmail, 
    createEmployee, 
    deleteEmployee,
    updateEmployee,
 };