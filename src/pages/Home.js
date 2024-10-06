import React from 'react';
import { Link } from 'react-router-dom';  // If using React Router

function Home() {
  return (
    <div>
      <h1>Welcome to the AI English Speaking App</h1>
      <Link to="/practice">Start Speaking</Link>
    </div>
  );
}

export default Home;
