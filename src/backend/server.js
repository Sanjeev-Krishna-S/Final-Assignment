const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');



// Check if MONGODB_URI is defined
const mongodbUri = config.get('MONGODB_URI');
if (!mongodbUri) {
  console.error("MongoDB URI is not defined. Check your config file or environment variables.");
  process.exit(1); // Exit the process if MongoDB URI is not defined
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
console.log('MongoDB URI:', mongodbUri);
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Rest of your server code...



const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  position: String,
  salary: String,
  location: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Rest of your server code...


// Route to fetch all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to fetch a specific employee by ID
app.get('/admin/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update a specific employee by ID
app.put('/admin/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to delete a specific employee by ID
app.delete('/admin/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new employee
app.post('/admin', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
