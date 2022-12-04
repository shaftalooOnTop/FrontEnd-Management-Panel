import './App.css';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './Components/layout/AppLayout';
import Blank from './pages/Blank';
import { getBearerToken } from './Services/axios';
import {useEffect} from 'react';
import {Restaurant_page} from './restaurant/restaurant_page'
import './restaurant/restaurant_page.css'
import { Toaster } from "react-hot-toast";

function App() {

  return (
    
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Blank />} />
                    <Route path='/user' element={<Blank />} />
                    <Route path='/order' element={<Blank />} />
                    <Route path='/menu-managment' element={<Restaurant_page />} />
                    <Route path='/accounting' element={<Blank />} />
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
