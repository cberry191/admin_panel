import {
    useEffect,
    useState
} from "react"
import Axios from "axios"

const noteCard = "m-5 g-10"
const buttonDiv = "flex flex-row justify-center gap-4 align-center m-10"
const buttonClass = "border-2 border-slate-600 rounded p-1"
const updateNoteForm = "flex flex-row justify-around m-5"

export const NoteList = ({className}) => {
    const [newNote, setNewNote] = useState("")
    const [updatedBody, setUpdatedBody] = useState("")
    const [noteList, setNoteList] = useState([])
    const [status, setStatus] = useState("")

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        Axios({
            method: 'get',
            url: 'http://localhost:5000/note', 
            withCredentials: true
        })
        .then((response) => {
            setLoading(false)
            console.log(response.data)
            setNoteList(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const addNote = () => {
        try {
            Axios({
                method: 'post',
                url: 'http://localhost:5000/note',
                withCredentials: true,
                data : {
                    author: localStorage.getItem('user'), // logged in user
                    date: Date.now(), // current date
                    body: newNote
                }
            })
            .then(response => {
                if (response.status == 200) {
                    setStatus("")
                } else {
                    setStatus("Write a note!")
                }
            }
            )
            .then(
                () => {
                    getNotes()
                }
            )
            // .then(() => { // reload notelist with new note
            //     setNoteList([
            //         ...noteList,
            //         {
            //             author: author,
            //             date: date,
            //             body: body
            //         },
            //     ]);
            // })
            .catch((error) => {
                setStatus("Must Add Note")
                console.log(error)
            })
        } catch (error) {
            setStatus("Must Add Note")
            console.log(error)
        }
    }

    const deleteNote = (noteId) => {
        Axios({
            method: "DELETE",
            url: 'http://localhost:5000/note',
            withCredentials: "include",
            data : {
                noteId: noteId,
            }
        })
        .then(getNotes)
    }

    const updateNote = (noteId) => {
        Axios({
            method: "PUT",
            url: 'http://localhost:5000/note',
            withCredentials: "include",
            data : {
                noteId: noteId,
                body: updatedBody
            }
        })
        .then(getNotes)
    }

    if(isLoading === true) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <div>
                <h3>Note List</h3>
                <div className={className}>
                    {noteList.map(note => (
                    <div key={note._id} className={noteCard}>
                        <h1>{note.author}</h1>
                        <h1>{note.date}</h1>
                        <h1>{note.body}</h1>
                        <div className={updateNoteForm}>
                            <input 
                                type="text" 
                                placeholder={note.body}
                                onChange={(event) => {
                                    setUpdatedBody(event.target.value)
                                }} />
                            <button className={buttonClass} onClick={() => {
                                updateNote(note._id)
                            }}>Update Note</button>
                            <button className={buttonClass} onClick={() => {
                                deleteNote(note._id)
                            }}>Delete Note</button>
                        </div>
                    </div>      
                    ))}
                </div>
                <div className={buttonDiv}>
                    <label>Add Note: </label>
                    <input
                        type="text"
                        onChange={(event) => {
                            setNewNote(event.target.value)
                            console.log(newNote)
                        }}
                    />
                    <button className={buttonClass} onClick={addNote}>Add Note</button>
                </div>
                <div className="text-blue-500 md:col-start-2">{status}</div>
            </div>
        )
    }
}