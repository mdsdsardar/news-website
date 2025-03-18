// src/components/Navbar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ChevronDown } from 'lucide-react';
import StateDropdown from './StateDropdown';

const categories = [
  { name: 'Politics', slug: 'politics' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Business', slug: 'business' },
  { name: 'Health', slug: 'health' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              NewsPortal
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 text-gray-800 hover:text-blue-600">
                Home
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  className="px-3 py-2 text-gray-800 hover:text-blue-600 flex items-center"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {categoryDropdownOpen && (
                  <div className="absolute z-10 bg-white shadow-lg rounded-md py-1 w-48 mt-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setCategoryDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* State Dropdown */}
              <StateDropdown />
              
              {/* Search */}
              <div className="relative ml-4">
                <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="outline-none px-2 py-1 w-40"
                  />
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-4">
          <div className="space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-800 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Categories */}
            <div className="space-y-1 pl-4 mt-2 border-l-2 border-gray-200">
              <p className="px-3 py-1 text-gray-600">Categories:</p>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="block px-3 py-1 text-gray-800 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile State Dropdown */}
            <div className="mt-3">
              <p className="px-3 py-1 text-gray-600">Select State:</p>
              <div className="px-3">
                <StateDropdown mobile={true} closeMenu={() => setMobileMenuOpen(false)} />
              </div>
            </div>
            
            {/* Mobile Search */}
            <div className="mt-3 px-3">
              <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="outline-none px-2 py-1 flex-1"
                />
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
