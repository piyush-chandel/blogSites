import React, { useId } from "react";

function Select({ label, className = "", options = [], ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        {...props}
        className={`px-2 py-2 rounded-lg
           bg-white text-black outline-none 
           duration-200 border border-gray-200 w-full ${className}`}
        id={id}
      >
            {options?.map(value=>{
                return (<option key={value} value={value}>{value}</option>)
            })}


      </select>
    </div>
  );
}

export default React.forwardRef(Select);
