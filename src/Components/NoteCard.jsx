import React from 'react';
import '../Components/css/NoteCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThumbtack } from '@fortawesome/free-solid-svg-icons';

const NoteCard = ({ title, content, date, isPinned, tags, onDelete, onPinNote, onEdit }) => {

  

  return (
   
      <div className="note-card">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <div className="date">{date}</div>
        <div className="actions">
          <button onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          { isPinned ?
          <button onClick={onPinNote}>
            <FontAwesomeIcon icon={faThumbtack}  color='gold'/>
          </button> :<button onClick={onPinNote}>
            <FontAwesomeIcon icon={faThumbtack}  color='white'/>
          </button> 
          }
          <button onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
}

export default NoteCard;
