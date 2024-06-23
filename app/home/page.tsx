import React from 'react';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={boxStyle}></div>
        <div style={boxStyle}></div>
      </div>
    </div>
  );
};

const boxStyle = {
  flex: 1,
  height: '800px',
  borderRadius: '10px',
  backgroundColor: '#f0f0f0',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  margin: '10px',
};

export default Home;