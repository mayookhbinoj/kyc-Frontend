import React from 'react'
import { CheckboxProps } from '../../Interfaces/components'
const Checkbox:React.FC<CheckboxProps> = ({label}) => {
  return (
    <div>
      <label className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <span className="ml-2 text-sm text-gray-600">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
