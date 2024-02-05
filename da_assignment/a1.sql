-- a1 drop builtin tables
DROP TABLE Customers;
DROP TABLE Orders;
DROP TABLE Shippings;

-- a2 create three tables
DROP TABLE IF EXISTS Assignments;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Employees;

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR (255),
    Department VARCHAR (255),
    Salary INT,
    HireDate DATE
);

CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY,
    Name VARCHAR(255),
    Department VARCHAR(255),
    StartDate DATE,
    EndDate DATE
);

CREATE TABLE Assignments (
    AssignmentID INT PRIMARY KEY,
    EmployeeID INT,
    ProjectID INT,
    HoursWorked DECIMAL (5, 2)
);

-- a3 insert data into the tables
INSERT INTO Employees (EmployeeID, Name, Department, Salary, HireDate)
VALUES 
(1, 'John Doe', 'Engineering', 60000, '2022-01-05'),
(2, 'Alice Smith', 'Marketing', 55000, '2021-03-12'),
(3, 'Bob Johnson', 'Engineering', 65000, '2023-05-20'),
(4, 'Sarah Williams', 'HR', 50000, '2022-09-10'),
(5, 'Michael Brown', 'Finance', 70000, '2021-11-15');

INSERT INTO Projects (ProjectID, Name, Department, StartDate, EndDate)
VALUES 
(1, 'Website Redesign', 'Engineering', '2022-08-15', '2022-12-31'),
(2, 'Product Launch', 'Marketing', '2021-05-20', '2021-10-30'),
(3, 'Infrastructure Upgrade', 'Engineering', '2023-01-15', '2023-07-30'),
(4, 'Employee Training Program', 'HR', '2022-10-01', '2022-12-05'),
(5, 'Budget Planning', 'Finance', '2023-03-31', '2023-06-30');

INSERT INTO Assignments (AssignmentID, EmployeeID, ProjectID, HoursWorked)
VALUES 
(1, 1, 1, 120.5),
(2, 2, 2, 90.0),
(3, 3, 1, 150.25),
(4, 4, 4, 80.75),
(5, 5, 5, 110.0);


--b) Calculate the total hours worked by each employee. 
-- Retrieve the name and total hours worked.
SELECT e.Name, SUM(a.HoursWorked) AS TotalHours
FROM Assignments AS a INNER JOIN Employees AS e ON a.EmployeeID = e.EmployeeID
GROUP BY e.Name
ORDER BY TotalHours DESC;

--c) Calculate the average salary by department. 
-- why order by? I am courious about which department has the highest average salary.
SELECT Department, AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY Department
ORDER BY AverageSalary DESC

-- d) Calculate the maximum hours worked on each project. 
SELECT p.Name, MAX(a.HoursWorked) AS MaxHoursWorked
FROM Assignments AS a INNER JOIN Projects AS p ON a.ProjectID = p.ProjectID
GROUP BY p.Name

-- e) Retrieve the names of employees in the engineering department
SELECT Name
FROM Employees
WHERE Department = 'Engineering'
ORDER BY Name

-- f) Retrieve the names of projects started after 2022. 
SELECT Name
FROM Projects
WHERE StartDate >= '2023-01-01'

-- g) Show all assignments details where the number of hours worked exceeds 100.
SELECT a.AssignmentID, e.Name AS Employee, p.Name AS Project, a.HoursWorked
FROM Assignments a
INNER JOIN Employees e ON a.EmployeeID = e.EmployeeID
INNER JOIN Projects p ON a.ProjectID = p.ProjectID
WHERE a.HoursWorked > 100;

-- h) Retrieve employee name along with the name of project assigned and the hours worked on each project.
SELECT e.Name AS Employee, p.Name AS Project, a.HoursWorked
FROM Assignments a
INNER JOIN Employees e ON a.EmployeeID = e.EmployeeID
INNER JOIN Projects p ON a.ProjectID = p.ProjectID


-- i) Who are the top 3 employees with the highest salary?
SELECT Name, Salary
FROM Employees
ORDER BY Salary DESC
LIMIT 3

-- j) Retrieve the names of employees who have not been assigned to projects 
-- starting with the letter 'P' and have worked more than 100 hours. 
-- it seems that no employee meets the condition?
SELECT e.Name
FROM Employees e
LEFT JOIN 
    (SELECT EmployeeID FROM Assignments AS a INNER JOIN Projects AS p ON a.ProjectID = p.ProjectID 
        WHERE a.HoursWorked > 100 AND p.Name LIKE 'P%'
    ) t ON e.EmployeeID = t.EmployeeID
WHERE t.EmployeeID IS NULL

-- k) Retrieve the department names where the average salary is above the company-wide average salary.
SELECT Department
FROM Employees
GROUP BY Department
HAVING AVG(Salary) > (SELECT AVG(Salary) FROM Employees)

-- l) Retrieve employee names who have worked on projects that started after 2022 and ended before 2024. 
SELECT e.Name
FROM Employees e
INNER JOIN Assignments a ON e.EmployeeID = a.EmployeeID
INNER JOIN Projects p ON a.ProjectID = p.ProjectID
WHERE p.StartDate >= '2023-01-01' AND p.EndDate < '2024-01-01'

-- m) Retrieve the names of employees whose names contain the letter 'a' and have worked on projects where the
-- project name starts with 'P'. Display their names along with the total number of hours worked on those
-- projects. 
SELECT e.Name, SUM(a.HoursWorked) AS TotalHours
FROM Employees e
INNER JOIN Assignments a ON e.EmployeeID = a.EmployeeID
INNER JOIN Projects p ON a.ProjectID = p.ProjectID
WHERE e.Name LIKE '%a%' AND p.Name LIKE 'P%'
GROUP BY e.Name