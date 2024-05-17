# Employee Management System (MERN Stack)

This project is a MERN stack web application developed as an Employee Management System. It was created as part of a Machine Test provided by 'HR_BLR- DealsDray'. The system allows an admin to manage employees effectively, with features to add, edit, delete, and search employees.

## Features

1. **Admin Authentication**: Admin can securely log in to access the management system.
2. **Employee Creation**: Admin can create employees with the following details:
   - Name
   - Image
   - Email ID
   - Mobile Number
   - Designation
   - Gender
   - Course
3. **Edit Employees**: Admin can update employee details as needed.
4. **Delete Employees**: Admin can remove employees from the system.
5. **Search Functionality**: Admin can search for employees by their name, designation, or course.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS/Bootstrap

## Installation

### Prerequisites

- Node.js
- MongoDB
- Git

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/himansu-1/mern-machine-test
    cd mern-machine-test
    ```

2. **Install dependencies**:
    ```sh
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install
    ```

3. **Environment variables**:
    Create a `.env` file in the `backend` directory with the following 
