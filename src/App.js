import "./App.css";
import { Login } from "./Components/Login/Login";

import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./Components/layout/AppLayout";
import Blank from "./pages/Blank";
import { getBearerToken } from "./Services/axios";
import {  useState } from "react";
import { Restaurant_page } from "./restaurant/restaurant_page";
import "./restaurant/restaurant_page.css";
import { Toaster } from "react-hot-toast";

import { AddRestaurant } from "./Components/Add-restaurant/AddRestaurant";
// import { Login } from "./Components/Auth/Login/Login";
import { Register } from "./Components/Auth/SignUp/Register";
import { Card } from "./Components/HomePage-customer/card";
import { ListCardRes } from "./Components/HomePage-customer/ListCards"
import {Table_managment} from "./Components/table-managment/Table_managment";
import { Sale_report } from "./Components/Sale-report/Sale-report"


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Blank />} />
          <Route path="/create-restaurant" element={<AddRestaurant/>} />
          <Route path="/order" element={<Blank />} />
          <Route path="/menu-managment" element={<Restaurant_page />} />
          <Route path="/table-managment" element={<Table_managment/>} />
          <Route path="/sale-report" element={<Sale_report/>} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
