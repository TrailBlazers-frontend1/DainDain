import React from 'react'
import "./styles.css"

const Dropdown = ({color,label,options,value,handleChange}) => {
  return (
    <label>
        {label? label : null}
        <select className={`select ${color}`} value={value} onChange={handleChange}>
            {options.map((option) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
    </label>
  )
}

export default Dropdown