DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    name NOT NULL,

)
CREATE TABLE employees(
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    first_name NOT NULL,
    last_name NOT NULL,
    role_id INTEGER,
    constraint FK_ROLE FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INTEGER,
    constraint FK_MANAGER FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL

)
CREATE TABLE roles(
  id INTEGER AUTO_INCREMENT  PRIMARY KEY,
  role_name NOT NULL,
  salary DECIMAL,
  department_id INTEGER,
  constraint FK_DEPARMENT FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
)