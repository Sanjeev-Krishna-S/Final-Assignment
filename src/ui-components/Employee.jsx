// Employee.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
  },
});

const Employee = () => {
  const classes = useStyles();
  const [employeesData, setEmployeesData] = useState([]);

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

  return (
    <div>
      <div className={classes.buttonContainer}>
        <h2>Employee List</h2>
        <Link to="/">
          <button>Logout</button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell><h3>Name</h3></TableCell>
              <TableCell><h3>Department</h3></TableCell>
              <TableCell><h3>Position</h3></TableCell>
              <TableCell><h3>Salary</h3></TableCell>
              <TableCell><h3>Location</h3></TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employee;
