import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import BookDetail from './components/BookDetail'; 
import EditBookPage from './components/EditBookPage'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/list" element={<ShowList />} />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route path="/update/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
