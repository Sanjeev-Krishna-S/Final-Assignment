import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
  },
  addButton: {
    backgroundColor: 'green',
    color: 'white',
    marginLeft: 'auto',
  },
  updateButton: {
    backgroundColor: 'blue',
    color: 'white',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
  },
  employeeListHeading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    color: 'white',
  },
});

const Admin = ({ authenticated }) => {
  const classes = useStyles();
  const [employeesData, setEmployeesData] = useState([]);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
    location: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployeesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/${id}`);
      const employeeToUpdate = response.data;
      setEmployeeToUpdate(employeeToUpdate);
      toast.success('Employee data loaded for update!', { position: 'top-right' });
    } catch (error) {
      console.error(error);
      toast.error('Error loading employee data for update', { position: 'top-right' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${id}`);
      const updatedEmployees = employeesData.filter((employee) => employee._id !== id);
      setEmployeesData(updatedEmployees);
      toast.success('Employee deleted successfully!', { position: 'top-right' });
    } catch (error) {
      console.error(error);
      toast.error('Error deleting employee', { position: 'top-right' });
    }
  };

  const handleInputChange = (field, value) => {
    setEmployeeToUpdate((prevEmployee) => ({ ...prevEmployee, [field]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/admin/${employeeToUpdate._id}`, employeeToUpdate);
      const updatedEmployees = employeesData.map((employee) =>
        employee._id === employeeToUpdate._id ? employeeToUpdate : employee
      );
      setEmployeesData(updatedEmployees);
      setEmployeeToUpdate(null);
      toast.success('Employee updated successfully!', { position: 'top-right' });
    } catch (error) {
      console.error(error);
      toast.error('Error updating employee', { position: 'top-right' });
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin', newEmployee);
      setEmployeesData([...employeesData, response.data]);
      setOpenAddDialog(false);
      toast.success('Employee added successfully!', { position: 'top-right' });
    } catch (error) {
      console.error(error);
      toast.error('Error adding employee', { position: 'top-right' });
    }
  };

  return (
    <div>
      <div className={classes.headingContainer}>
        <h2 className={classes.employeeListHeading}>Employee List</h2>
        <Link to={'/'}>
        <Button className={classes.logoutButton}>Logout</Button>
        </Link>
      </div>

      <div className={classes.buttonContainer}>
        {authenticated && (
          <Button className={classes.addButton} onClick={() => setOpenAddDialog(true)}>
            Add Employee
          </Button>
        )}
        <Link to="/form">
          <Button>Create Employee</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Name</h3>
              </TableCell>
              <TableCell>
                <h3>Department</h3>
              </TableCell>
              <TableCell>
                <h3>Position</h3>
              </TableCell>
              <TableCell>
                <h3>Salary</h3>
              </TableCell>
              <TableCell>
                <h3>Location</h3>
              </TableCell>
              <TableCell>
                <h3>Actions</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesData.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.location}</TableCell>
                <TableCell>
                  <Button className={classes.updateButton} onClick={() => handleUpdate(employee._id)}>
                    Update
                  </Button>
                  <Button className={classes.deleteButton} onClick={() => handleDelete(employee._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {employeeToUpdate && (
        <Dialog open={!!employeeToUpdate} onClose={() => setEmployeeToUpdate(null)}>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                fullWidth
                label="Name"
                value={employeeToUpdate.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Department"
                value={employeeToUpdate.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Position"
                value={employeeToUpdate.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Salary"
                value={employeeToUpdate.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Location"
                value={employeeToUpdate.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEmployeeToUpdate(null)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              fullWidth
              label="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Department"
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Position"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Salary"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              value={newEmployee.location}
              onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Admin;
