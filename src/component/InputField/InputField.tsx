import React from 'react'
import { InputFieldProps } from '../../Interfaces/components'
const InputField:React.FC<InputFieldProps> = ({  id, label,name,value,type,onChange,placeholder ,hasError,errorMessage}) => {
  return (
    <div>
     <label htmlFor={id} className="block text-sm font-medium text-gray-700">
     {label}
     </label>
     <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        className={`mt-1 block w-full px-3 py-2 border ${
          hasError ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none `}
      />  
       {hasError && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}

export default InputField
