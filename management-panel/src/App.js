import './App.css';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import { getBearerToken } from './Services/axios';
import {useEffect} from 'react';
function App() {

  return (
    
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Blank />} />
                    <Route path='/user' element={<Blank />} />
                    <Route path='/order' element={<Blank />} />
                    <Route path='/menu-managment' element={<Blank />} />
                    <Route path='/accounting' element={<Blank />} />
                </Route>
            </Routes>
    </BrowserRouter>
  );
}

export default App;
