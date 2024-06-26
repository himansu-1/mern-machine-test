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
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```sh
    # Start backend server
    cd backend
    npm start

    # Start frontend development server
    cd ../frontend
    npm start
    ```

The application will be accessible at `http://localhost:3000`.

## Usage

1. **Login**: Access the login page and enter admin credentials to log in.
2. **Dashboard**: Once logged in, the admin can view, add, edit, and delete employees from the dashboard.
3. **Add Employee**: Navigate to the 'Add Employee' section, fill out the form, and submit to create a new employee.
4. **Edit/Delete Employee**: Use the action buttons on the employee list to edit or delete an employee.
5. **Search Employees**: Use the search bar to filter employees by name, designation, or course.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

**Test/MERN Stack Machine Test provided by 'HR_BLR- DealsDray'**

For more information or any queries, please contact the repository owner.
