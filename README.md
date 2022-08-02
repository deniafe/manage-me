# Manage Me - An Employee Management System

- Manage Me is an api that enables users to create, store and manage Employee Records
- The application also provides simple facilities for a payroll and leave application
- Employess can also log daily tasks and be assigned to projects
- Employee management system can manage and store details like employees personal info, their work experiences and education.

-------------

This web application contains two account access:
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
* Run the following commands
## Installation

yarn // install node modules

## Setup and run the database

yarn db:dev:restart // start postgres in docker and push migrations

## Running the app

yarn start:dev // start api in dev mode

* You can edit the .env files in the project or leave as is

## For Test

```bash
* You can adjust the sleep time for the `test:e2e` in the package.json file to suite your system speed.

# e2e tests
$ yarn test:e2e // start postgres in docker and push migrations and run the e2e test

```



