import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePageLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomePageLayout;
