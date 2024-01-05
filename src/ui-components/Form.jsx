import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const [employeeData, setEmployeeData] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
    location: '',
  });

  const handleInputChange = (field, value) => {
    setEmployeeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/admin', employeeData);
      toast.success('Employee added successfully!', { position: 'top-right' });
      navigate('/admin'); // Use navigate function to navigate
    } catch (error) {
      console.error(error);
      toast.error('Error adding employee', { position: 'top-right' });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h5" gutterBottom>
          Create Employee
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            value={employeeData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Department"
            value={employeeData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Position"
            value={employeeData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Salary"
            value={employeeData.salary}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            value={employeeData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
