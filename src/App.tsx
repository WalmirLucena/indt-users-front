import React from 'react';
import { Route } from 'react-router-dom';

import Home from './presentation/pages/Home/Home';
import Dashboard from './presentation/pages/Dashboard/Dashboard';

const App = () => (
  <>
    <Route element={<Home />} path="/" />
    <Route element={<Dashboard />} path="/dashboard" />
  </>
);

export default App;
