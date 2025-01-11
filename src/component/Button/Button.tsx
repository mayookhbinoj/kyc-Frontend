import React from 'react'
import { ButtonProps } from '../../Interfaces/components'
const Button: React.FC<ButtonProps> = ({ type, label, onClick }) => {
    return (
      <button
        type={type}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

export default Button
