import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../url';

const AddEditNotes = ({setOpenAddEditModel,getAllNotes,setTitle,setContent,title,content,add,setAdd,id}) => {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can now use the title and note state variables when submitting the form
    const body={
      title,
      content
    }
    const accessToken =localStorage.getItem("token")
    if(add){
    const response=await axios.post(`${baseUrl}/add-note`,body,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }}
    )
    if(response.data){
      
      setOpenAddEditModel({isShown: false})
      getAllNotes();
    }
  }
  else{

    const response = await axios.put(`${baseUrl}/edit-note/`+id,body,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }})
      if(response.data){
       
        setOpenAddEditModel({isShown: false})
        getAllNotes();
      }


  }
  setAdd(!add)
 

  }

  


  return (
    <div>
      <h4>Add/EditNotes</h4>
      <input 
        type="text" 
        placeholder='title' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <h4>Note</h4>
      <textarea 
        placeholder='Enter a note ' 
        rows={10}
        cols={50}
        value={content} 
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>{add? <p>Add</p>:<p>Update</p>}</button>
    </div>
  )
}

export default AddEditNotes