// App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './ui-components/Login';
import Employee from './ui-components/Employee';
import Admin from './ui-components/Admin';
import Form from './ui-components/Form';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<Login setIsAdmin={setIsAdmin} />}
      />
      <Route
        path="/list"
        element={<Employee />}
      />
      <Route
        path="/admin"
        element={<Admin isAdmin={isAdmin} />}
      />
      <Route
  path="/form"
  element={<Form />} // You can replace Form with the component you want to render on /form
/>

    </Routes>
  );
}

export default App;
