import React from 'react';
import { FaCode } from 'react-icons/fa';

function HomePage() {
  return (
    <>
      <div className='app'>
        <FaCode style={{ fontSize: '4rem' }} /><br />
        <span style={{ fontSize: '2rem' }}>Interactive Group Chat</span>
      </div>
    </>
  )
}

export default HomePage;
