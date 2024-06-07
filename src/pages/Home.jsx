import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import NoteCard from '../Components/NoteCard';
import '../pages/css/Home.css';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../url';

const Home = () => {
  const navigate = useNavigate();
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [name, setName] = useState('');
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const[add,setAdd]=useState(true)
  const [id,setId]=useState(null);
  const [accessToken,setAccessToken]=useState('')

  const getUserInfo = async () => {
    if (!localStorage.key("token")) {
      navigate('/login');
      alert('Invalid');
      return;
    }

    const accessToken = localStorage.getItem("token");

    const user = await axios.get(`${baseUrl}/get-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    setName(user.data.name);
  };

  const getAllNotes = async () => {
    if (!localStorage.key("token")) {
      navigate('/login');
      alert('Invalid');
      return;
    }

    const accessToken = localStorage.getItem("token");

    const response = await axios.get(`${baseUrl}/get-all-notes`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    setNotes(response.data.notes);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
     setAccessToken(localStorage.getItem("token"))
  }, []);

  const onEdit =async(t,c,id)=>{
     setAdd(false)
     setTitle(t);
     setContent(c);
     setId(id)

    setOpenAddEditModel({ isShown: true })

  }

  const onDelete=async(id)=>{
    
    const response = await axios.delete(`${baseUrl}/delete-note/`+id,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }})

      if(response.data){
        getAllNotes();
      }

  }

  const onPinNote =async(bol,id)=>{
  
    const response =await axios.put(`${baseUrl}/edit-note-pinned/`+id,bol,{
      headers:{
        Authorization :`Bearer ${accessToken}`
      }
    })
    if(response.data){
      getAllNotes();
    }
  }
 
  return (
    <div className="home-container">
      <div className="header">
        <p>Hi {name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Navbar  notes={notes} setNotes={setNotes} getAllNotes={getAllNotes}/>
      <div className="note-card-container">
        {notes.length ==0? <h1>No notes found </h1> :  notes.map((note) => (
          <NoteCard
            title={note.title}
            content={note.content}
            date={note.createdOn}
            key={note._id}
            isPinned={note.isPinned}
            onDelete={() =>onDelete(note._id)}
            onPinNote={() => onPinNote(note.isPinned,note._id)}
            onEdit={()=>onEdit(note.title,note.content,note._id)}
          />
        ))}
      </div>
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => setOpenAddEditModel({ ...openAddEditModel, isShown: false })}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }
        }}
        contentLabel="Add/Edit Note"
      >
  
        <AddEditNotes setOpenAddEditModel={setOpenAddEditModel} getAllNotes={getAllNotes} title={title} setTitle={setTitle} content={content} setContent={setContent} add={add} setAdd={setAdd} id={id}/>
      </Modal>
      <button
        className="add-button"
        onClick={() => setOpenAddEditModel({ isShown: true },setAdd(true))}
      >
        +
      </button>
    </div>
  )
}

export default Home;