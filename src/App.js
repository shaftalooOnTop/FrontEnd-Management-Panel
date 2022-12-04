import "./App.css";
import { Login } from "./Components/Login/Login";

import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./Components/layout/AppLayout";
import Blank from "./pages/Blank";
import { getBearerToken } from "./Services/axios";
import { useEffect } from "react";
import { Restaurant_page } from "./restaurant/restaurant_page";
import "./restaurant/restaurant_page.css";
import { Toaster } from "react-hot-toast";

import { AddRestaurant } from "./Components/Add-restaurant/AddRestaurant";

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
          <Route path="/user" element={<AddRestaurant/>} />
          <Route path="/order" element={<Blank />} />
          <Route path="/menu-managment" element={<Restaurant_page />} />
          <Route path="/accounting" element={<Blank />} />
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
