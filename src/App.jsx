import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import FoodSelection from "./Pages/FoodSelection";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<FoodSelection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
