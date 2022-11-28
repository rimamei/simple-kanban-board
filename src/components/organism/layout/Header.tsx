import Link from 'next/link';
import React, { useState } from 'react';
import * as Fa from 'react-icons/fa';

const Header = () => {
  return (
    <nav className="relative bg-white border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-900 shadow-md">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="#" className="flex items-center">
          <Fa.FaCubes className='"h-6 mr-3 sm:h-9"' />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Simple Kanban Board
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
