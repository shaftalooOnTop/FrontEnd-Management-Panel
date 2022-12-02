import React, { useState } from "react";
import './App.css';
import { Login } from "./Components/Auth/Login/Login";
import { Register } from "./Components/Auth/SignUp/Register";
import { Card } from "./Components/HomePage-customer/card";
import { ListCardRes } from "./Components/HomePage-customer/ListCards"
import { AddRestaurant } from "./Components/Add-restaurant/AddRestaurant";
import {Table_managment} from "./Components/table-managment/Table_managment";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <div>
        <Table_managment/>
      </div>
    </div>
  );
}

export default App;
