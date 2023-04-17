import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Current from './pages/Current/Current.jsx';
import Forecast from './pages/Forcast/Forecast.jsx';
import './App.css';

function App() {
  
  return (
    <div className="relative">
      <div className='nav bg-white w-fit md:top-20 top-10 flex flex-wrap rounded-full overflow-hidden drop-shadow-lg'>
        <NavLink to='/current' className="md:py-2 md:px-4 p-3 inline-block hover:bg-slate-500 hover:text-slate-50 transition duration-300">現在天氣</NavLink>
        <NavLink to='/forecast' className="md:py-2 md:px-4 p-3 inline-block hover:bg-slate-500 hover:text-slate-50 transition duration-300">明天天氣</NavLink>
      </div>
      <Routes>
        <Route path='/' element={<Current/>}/>
        <Route path='current' element={<Current/>}/>
        <Route path='forecast' element={<Forecast/>}/>
      </Routes>
    </div>
  );
}

export default App;
