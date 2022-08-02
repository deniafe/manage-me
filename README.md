# Manage Me - An Employee Management System

- Manage-Me is an api that enables admins to create, store and manage Employee Records
- The application also provides simple facilities to manage payroll, leaves and project assignments
- Employess can also log daily tasks and be voice their grievances
- Manage-me can manage and store details like employees personal info, their work experiences and education.
- Admins can also use the application to generate 3 types of reports. Leave Reports, Activities Report and Projects Reports

-------------

This api contains two account access:
- Admin
- Employee

The two accounts contain different privileges.

-------------
Technology used :
- NODE JS 
- EXPRESS
- NEST JS
- TYPESCRIPT 
- PRISMA
- POSTGRESQL
- DOCKER

-------------

The different modules of this project is as follows:
- Auth
- Activity
- Employee
- Grievance
- Leave
- Project
- Report
- Resignation
- Salary

-------------

## How to run this project in a local development machine
* Make sure you install node modules using `yarn` command
* Make sure you have docker running
* You can edit the .env files in the project or leave as is (OPTIONAL)
* Run the following commands
## Installation

yarn // install node modules

## Setup and run the database

yarn db:dev:restart // start postgres in docker and push migrations

## Running the app

yarn start:dev // start api in dev mode

## Running Tests

```bash
* You can adjust the sleep time for the `test:e2e` in the package.json file to suite your system speed.

# e2e tests
$ yarn test:e2e // start postgres in docker and push migrations and run the e2e test

```

-------------


# API END POINTS

## Auth

### Register employee  -  POST /auth/register
###### Permission: Admins and Employees

#### Headers

* **content-type  :** Set value to application/json <br />
string

#### Body Params

* **email :** Employee's email ('employee@email.com') <br />
string

* **password :** Password that will be passed to employee <br />
string

* **firstName :** Employee's first name <br />
string

* **lastName :** Employee's last name <br />
string

* **gender :** Employees's gender ('Female') <br />
string

* **middleName :** Employee's last name <br />
string

* **dob :** Employee's date of birth (new Date('09/20/1991')) <br />
Date

* **phone :** Employees's gender ('Female') <br />
string

* **photo :** Url of the employee's picture <br />
string


### Login  -  POST /auth/login
###### Permission: Admins and Employees

#### Headers

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **email :** Employee's email (employee@email.com) <br />
string

* **password :** Employee's password <br />
string


## Employees

### Get employees  -  GET /employees
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Get logged in employee  -  GET /employees/me
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get employee by Id  -  GET /employees/:employeeId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit employee  -  PATCH /employees/:employeeId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **email :** [OPTIONAL] Employee's email ('employee@email.com') <br />
string

* **firstName :** [OPTIONAL] Employee's first name <br />
string

* **lastName :** [OPTIONAL] Employee's last name <br />
string

* **gender :** [OPTIONAL] Employees's gender ('Female') <br />
string

* **middleName :** [OPTIONAL] Employee's last name <br />
string

* **dob :** [OPTIONAL] Employee's date of birth (new Date('09/20/1991')) <br />
Date

* **dateOfJoining :** [OPTIONAL] Employee's date of joining the comapany (new Date('01/20/2022')) <br />
Date

* **terminateDate :** [OPTIONAL] Employee's date of leaving the comapany (new Date('07/20/2022')) <br />
Date

* **phone :** [OPTIONAL] Employees's gender ('Female') <br />
string

* **photo :** [OPTIONAL] Url of the employee's picture <br />
string

* **address :** [OPTIONAL] Url of the employee's picture ({street: string, city: string, country: string}) <br />
JSON object

* **workExperience :** [OPTIONAL] Employee's work experience({fromDate: Date, toDate: Date, companyName: string, designation: string}) <br />
JSON object

* **education :** [OPTIONAL] Employee's education ([{school: string, degree: string, grade: string, year: string}]) <br />
JSON object

### Delete employee by Id  -  DELETE /employees/:employeeId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


## Activities

### Create activities -  POST /activities
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **date :** Work day date <br />
Date

* **in :** The time the employee is coming in <br />
Date

* **tasksForToday :** A list of tasks for employee to do <br />
JSON Object (Array/List of strings)


### Get activities  -  GET /activities
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get activity by Id  -  GET /activities/activityId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit activities  -  PATCH /activities/:activityId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params


* **date :** Work day date <br />
Date

* **in :** The time the employee comes in <br />
Date

* **in :** The time the employee goes out <br />
Date

* **tasksForToday :** A list of tasks for employee to do <br />
JSON Object (Array/List of strings)

* **accomplishment :** A list of things employee has accomplished for the day <br />
JSON Object (Array/List of strings)

* **tasksForTomorrow :** A list of tasks for employee to do the nest day <br />
JSON Object (Array/List of strings)

### DELETE activity by Id  -  DELETE /activities/activityId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string



## Grievances

### Create Grievance  -  POST /grievances
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **title :** Grievance title <br />
string

* **details :** Grievance details <br />
string

### Get grievances  -  GET /grievances
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get grievance by Id  -  GET /grievanes/grievanceId
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit Grievance  -  PATCH /grievances/:grievanceId
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **title :** [OPTIONAL] Grievance title <br />
string

* **details :** [OPTIONAL] Grievance details <br />
string

### DELETE grievance by Id  -  DELETER /grievanes/grievanceId
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


## Projects

### Create projects  -  POST /projects
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **title :** Project's title <br />
string

* **description :** Project's description <br />
string

* **url :** Projects's url <br />
number

* **estimatedCost :** Projects's estimated cost <br />
string

* **estimatedTime :** Projects's estimated time <br />
Date

* **status :** Project's status ['INACTIVE', 'ACTIVE', 'COMPLETED', 'CANCELLED'] <br />
string (Enum)

* **employees :** A list of employees that will be part of the project ([{id: 1}, {id: 2}])<br />
JSON Object

### Get projects  -  GET /projects
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get projects by Id  -  GET /projects/projectId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit projects  -  PATCH /projects/:projectId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string
**content-type  :** Set value to application/json <br />
string


#### Body Params

* **title :** [OPTIONAL] Project's title <br />
string

* **description :** [OPTIONAL] Project's description <br />
string

* **remark :** [OPTIONAL] Project's remark <br />
string

* **url :** [OPTIONAL] Projects's url <br />
number

* **estimatedCost :** [OPTIONAL] Projects's estimated cost <br />
string

* **estimatedTime :** [OPTIONAL] Projects's estimated time <br />
Date

* **status :** [OPTIONAL] Project's status ['INACTIVE', 'ACTIVE', 'COMPLETED', 'CANCELLED'] <br />
string 

* **employees :** [OPTIONAL] A list of employees that will be part of the project ([{id: 1}, {id: 2}])<br />
JSON Object


### DELETE project by Id  -  DELETE /projects/projectId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


## Leaves

### Create leave Application  -  POST /leaves
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **fromDate :** Leave start date <br />
Date

* **toDate :** Leave end date <br />
Date

* **reasonForLeave :** The reason for the leave <br />
string

* **type :** Type of leave ['SICK', 'CASUAL', 'MATERNITY', 'PATERNITY', 'GEREAVEMENT', 'COMPENSATORY', 'SABBATICAL', 'UNPAID'] <br />
string (Enum)

### Get leaves  -  GET /leaves
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get leaves by Id  -  GET /leaves/leaveId
###### Permission: Admins andEmployees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit leaves  -  PATCH /leaves/:leaveId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **fromDate :** [OPTIONAL] Leave start date <br />
Date

* **toDate :** [OPTIONAL] Leave end date <br />
Date

* **reasonForLeave :** [OPTIONAL] The reason for the leave <br />
string

* **type :** [OPTIONAL] Type of leave ['SICK', 'CASUAL', 'MATERNITY', 'PATERNITY', 'GEREAVEMENT', 'COMPENSATORY', 'SABBATICAL', 'UNPAID'] <br />
string (Enum)

### Manage leaves  -  PATCH /leaves/manage/:leaveId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string
**content-type  :** Set value to application/json <br />
string


#### Body Params

* **status :** Type of leave ['APPROVED', 'PENDING', 'REJECTED', 'CANCELLED'] <br />
string (Enum)

### DELETE leave by Id  -  DELETE /leaves/leaveId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


## Resignation

### Create resignation  -  POST /resignations
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **reason :** Employee's reason for resignation <br />
string

* **details :** Employee's resignation details <br />
string

* **notice :** Employee's resignation notice <br />
Date

### Get resignations  -  GET /resignations
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get resignation by Id  -  GET /resignations/resignationId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit resignations  -  PATCH /resignations/:resignationId
###### Permission: Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **reason :** [OPTIONAL] Employee's reason for resignation <br />
string

* **details :** [OPTIONAL] Employee's resignation details <br />
string

* **notice :** [OPTIONAL] Employee's resignation notice <br />
Date


### DELETE resignation by Id  -  DELETE /resignations/resignationId
###### Permission: Admins and Employees

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


## Salary

### Create salary  -  POST /salaries
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **basicSalary :** Basic salary for an employee <br />
string

* **bankName :** Employee's bank name <br />
string

* **accountNumber :** Employee's account number <br />
string

* **accountName :** Employee's account name <br />
string

* **employeeId :** The ID of the employee who this salary is being created for <br />
number

### Get salaries  -  GET /salaries
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


### Get salary by Id  -  GET /salaries/salaryId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Edit salary  -  PATCH /salaries/:salaryId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

* **content-type  :** Set value to application/json <br />
string


#### Body Params

* **basicSalary :** [OPTIONAL] Basic salary for an employee <br />
string

* **bankName :** [OPTIONAL] Employee's bank name <br />
string

* **accountNumber :** [OPTIONAL] Employee's account number <br />
string

* **accountName :** [OPTIONAL] Employee's account name <br />
string

* **employeeId :** [OPTIONAL] The ID of the employee who this salary is being created for <br />
number

### DELETE salary by Id  -  DELETE /salaries/salaryId
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string


## Reports

### Get leave reports  -  GET /reports/leave
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Get activity reports  -  GET /reports/activity
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string

### Get project reports  -  GET /reports/project
###### Permission: Admins

#### Headers

* **Authorization :** Set value to Bearer ACCESS_TOKEN <br />
string