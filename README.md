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


## API END POINTS

# Headers

* Authorization : Set value to Bearer ACCESS_TOKEN
string

* content-type  : Set value to application/json
string

# Create an employee

-Permission: Admins

* email : Employee's email ('employee@email.com')
string

* password : Password that will be passed to employee
string

* firstName : Employee's first name
string 

* lastName : Employee's last name
string   

* dob : Employee's date of birth (new Date('09/20/1991'))
Date   

* gender : Employees's gender ('Female')
string


# Login

-Permission: Admins and Employees

* email : Employee's email (employee@email.com)
string

* password : Password that will be passed to employee
string

