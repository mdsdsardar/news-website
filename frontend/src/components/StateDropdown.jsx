// src/components/StateDropdown.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const states = [
  'National',
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const StateDropdown = ({ mobile = false, closeMenu = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('National');

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setIsOpen(false);
    if (mobile) closeMenu();
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center ${mobile ? 'w-full py-2' : 'px-3 py-2'} text-gray-800 hover:text-blue-600`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedState} <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className={`absolute z-10 bg-white shadow-lg rounded-md py-1 ${mobile ? 'w-full' : 'w-48'} mt-2 max-h-64 overflow-y-auto`}>
          {states.map((state) => (
            <button
              key={state}
              onClick={() => handleStateSelect(state)}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${
                selectedState === state ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StateDropdown;
