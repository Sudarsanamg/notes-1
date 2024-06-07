import React from 'react'
import SearchBar from './SearchBar'
import axios from 'axios'
import { useState } from 'react'

const Navbar = ({setNotes,Notes,getAllNotes}) => {
    const [search,setSearch]= useState('')

   
   const onClearSearch =()=>{
    setSearch("")
    getAllNotes()
    
   }

  return (
    <div>
        <p>Notes</p>
        <SearchBar value={search} onChange={(e)=>setSearch(e.target.value)}  setNotes={setNotes} onClearSearch={onClearSearch}/>
        
        
        


    </div>
  )
}

export default Navbar