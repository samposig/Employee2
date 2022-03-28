const inquirer = require('inquirer');
const db = require('./db/connection.js');
const table = require('console.table');
const { application } = require('express');

function display_list(){
    inquirer.prompt([
        {
         type:  'list',  
         name: 'option',
         message: 'What would you like to see?',
         choices: [
             {
                 name: 'view all departments',
                 value: 'view_all_departments'
             },
             {
                 name: 'view all roles',
                 value: 'view_all_roles'
             },
             {
                name: 'view all employees',
                value: 'view_all_employees'
            },
            {
                name: 'add a department',
                value: 'add_a_department'
            },
            {
                name: 'add a role',
                value: 'add_a_role'
            },
            {
                name: 'add an employee',
                value: 'add_an_employee'
            },
            {
                name: 'update an employee role',
                value: 'update_an_employee_role'
            },
         ]
        }
    ])

    .then((option) => {
        const { choices } = option
    if(choices=== 'view_all_departments') {
        viewAllDepartments()
    } else if (choices === 'view_all_roles'){
        viewAllRoles()
    } else if (choices === 'view_all_employees'){
        viewAllEmployees()
    } else if(choices === 'add_a_department'){
        addADepartment()
    } else if(choices === 'add_a_role'){
        addARole();
    } else if(choices === 'add_an_employee'){
        addEmployee();
    } else {
      updateAnEmployeeRole();  
    }
   display_list(); 
});
}


function viewAllDepartments(){
    const sql=`SELECT * FROM department`;
    db.query(sql,(err,result)=>{
        if (err){
            throw err
        }
        console.table(result);
        display_list();
    })
   
}

//view all employees
function viewAllEmployees(){
    const sql=`SELECT * FROM employee`;
    db.query(sql,(err,result)=>{
        if (err)
            throw err
        
       console.table(result);
       display_list();
    })
   
} 

//view all roles
function view_all_roles(){
   const sql="SELECT r.title,r.salary,d.name,d.id FROM role AS r JOIN department AS d ON d.id = r.department_id";
    db.query(sql,(err,result)=>{
        if (err)
            throw err
        
       console.table(result);
       display_list();
    })
    
} 

//add a dept-add:name
function addADepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the department?'
        }
    ]) 
    .then((response) => {
       
        const sql=`INSERT INTO department (name) VALUES (?)`;
        db.query(sql,response.deptName,(err,result)=>{
            if (err)
            throw err
            console.table(result);
            display_list();
      });  

    });  
   
}

//add a role
function addARole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name:'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department does the role belong to?'
            
        }
    ]) 
    .then((response) => {
       
        const sql=`INSERT INTO role SET ? `;
        db.query(sql,response,(err,result)=>{
            if (err)
            throw err
            console.log(result);
            display_list();
      }); 

    });  
    
}

// add a employee
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role of the employee?'
        },
        {
            type: 'input',
            name: 'manager_id' ,
            message: 'Who is the employees manager?'
        }
    ])
    .then((response) => {
       
        const sql=`INSERT INTO employee SET ?`;
        db.query(sql,response,(err,result)=>{
            if (err)
            throw err
            console.log(result);
            display_list();
      });  
    });  
   
}

// update employee role
function updateAnEmployeeRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'Which employee role do you want to update?'
        },
        {
            type: 'input',
            name:  "role"   ,
            message: 'Which role do you want to assign the employee?' 
        }
 
    ])

    .then((response) => {
       
        const sql=`UPDATE employee SET role_id = ? WHERE id = ?`;
        db.query(sql,[response],(err,result)=>{
            if (err)
            throw err
            console.log(result);
            display_list(); 
      });  
    }); 
   
}
