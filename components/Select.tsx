import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export  function SelectNumberOfImages() {
  const [selectedSizeOption, setSelectedSizeOption] = useState("512x512")

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },

  ]
   
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSizeOption(event.target.value)
  }

  return (
    <div className="relative w-16">
      <select
        value={selectedSizeOption}
        onChange={handleChange}
        className="w-full appearance-none bg-black border text-white font-bold rounded-md py-3 pl-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        <option value="" disabled>{selectedSizeOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
        <ChevronDown className="h-4 w-4 text-white" />
      </div>
    </div>
  )
}

export function ResolutionSelect() {
    const [selectedOption, setSelectedOption] = useState("512x512")
  
    const options = [
      { value: '512x512', label: '512x512' },
      { value: '724x724', label: '724x724' },
      { value: '1024x1024', label: '1024x1024' },
  
    ]
     
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value)
    }
  
    return (
      <div className="relative w-28">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="w-full appearance-none bg-black border text-white font-bold rounded-md py-3 pl-4 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="" disabled>{selectedOption}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
          <ChevronDown className="h-4 w-4 text-white" />
        </div>
      </div>
    )
  }