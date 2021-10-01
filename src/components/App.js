import { useState, useEffect } from "react";
// import {BrowserRouter as Router, Route} from "react-router-dom";
import Axios from 'axios';
import "./App.css";

function App() {
  const [title, changeTitle] = useState("");
  const [note, changeNote] = useState("");

  const [notesList, changeList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8080/list').then((response) => {
      changeList(response.data);
    });
  }, [notesList]);

  function tackleChange(event) {
    const { name, value } = event.target;

    name === "title" ? changeTitle(value) : changeNote(value);
  }

  function addNote(event) {
    if (!title || !note) {
      return null;
    }
    changeTitle("");
    changeNote("");

    Axios.post('http://localhost:8080/post', {title: title, note: note}).then(() => {
      alert("Successful insert");
    });

  }

  function deleteNote(id, index) {
    if (!id) {
      alert("refresh required");
      return null;
    }
    
    Axios.delete(`http://localhost:8080/delete/${id}`);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>NotePad</h1>
      </div>
      <div className="inputForm">
        <input
          onChange={tackleChange}
          type="text"
          value={title}
          name="title"
          placeholder="Title"
        />
        <textarea
          rows="5"
          onChange={tackleChange}
          type="text"
          value={note}
          name="note"
          placeholder="Take a note"
        />
        <button className="add" onClick={addNote}>
          <span>Add</span>
        </button>
      </div>
      <div>
      {notesList.map((singleNote, index) => (
          <div className="notes" key={singleNote.id} id={singleNote.id}>
            <h1>{singleNote.title}</h1>
            <p>{singleNote.text}</p>
            <button
              onClick={() => {
                deleteNote(singleNote.id, index);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;