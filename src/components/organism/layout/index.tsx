import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='font-poppins'>
      <Header />
      <div className='container mx-auto'>{children}</div>
    </div>
  );
};

export default Layout;
