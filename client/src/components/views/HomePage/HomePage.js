import React from 'react';
import { FaCode } from "react-icons/fa";

function HomePage() {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: '4rem' }} /><br />
        <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
      </div>
      <div style={{ float: 'right' }}>Thank you for using this app chat by zTsugumi</div>
    </>
  )
}

export default HomePage;
