import React from 'react'

const Search = ({placeholder, value, setChange}) => {

     
  return (
   <form className="border-b-2 border-[#8E8AD8] mb-3 rounded-sm">
                        <input className="w-full h-9 outline-none px-2 bg-[#EDF2FE] rounded-sm" placeholder={placeholder} onChange={(e) => setChange(e.target.value)} value={value}/>
                      </form>
  )
}

export default Search