import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import Dados from './components/Dados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/post" />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/dados/:id" element={<Dados />} />
      </Routes>
    </Router>
  );
}

export default App;