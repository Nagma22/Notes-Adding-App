import { Component } from "react";
import AddNote from './AddNote';       
import ReadNote from './ReadNote'; 
import NoteList from './NoteList';
import { Route, Link} from 'react-router-dom';
import '../Styles/notesApp.css';

class NotesApp extends Component {

    constructor(props) {
        super(props);

        const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

        this.state = {
            notes: notes,
            selectedNote: null,
        };

        this.getNotesId = this.getNotesId.bind(this);
        this.addNote = this.addNote.bind(this);
        this.viewNote = this.viewNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    getNotesId() {
        return this.state.notes.length > 0 ? this.state.notes[this.state.notes.length - 1].id + 1 : 0;
    }

    persistNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
        this.setState({notes: notes});
    }

    addNote(note) {
        note.id = this.getNotesId();
        const notes = this.state.notes;
        notes.push(note);
        this.persistNotes(notes);
        this.setState({selectedNote: null});
    }

    deleteNote(id) {
        const notes = this.state.notes;
        const notePosition = notes.findIndex((n)=> n.id === id);
        if (notePosition >= 0) {
            if (window.confirm('Are you sure you want to delete this note?')) {
                notes.splice(notePosition, 1);
                this.persistNotes(notes);
                this.setState({selectedNote: null, editMode: false});
            }
        } else {
            console.warn('note with id ' + id + ' not found when trying to delete it');
        }
    }

    viewNote(id) {
        const notePosition = this.state.notes.findIndex((n) => n.id === id);
        if (notePosition >= 0) {
            this.setState({selectedNote: this.state.notes[notePosition]});
        } 
    }

    getEmptyNote() {
        return {
            title: "",
            description: ""
        };
    }

    renderLeftMenu () {
        return (
            <div className="card border-override">
                {this.renderHeader()}
                <div className="card-body">
                    <NoteList notes={this.state.notes} viewNote={this.viewNote}/>
                </div>
            </div>
        )
    }

    renderHeader() {
        return (
            <div>
                <Route exact path="/note"
                       render={routeProps => <Link to="/"><button type="button" className="btn btn-info">Close Add Note Form</button></Link>}/>
                {["/", "/note/:id"].map(path =>
                        <Route key={path} exact path={path}
                               render={routeProps => <Link to="/note"><button type="button" className="btn btn-info">Add Note</button></Link>}/>
                )}
            </div>
        )
    }

    setComponentRoutes() {
        return (
        
            <div>
                <Route exact path="/note/:id"
                       render={routeProps =>  <ReadNote deleteNote={this.deleteNote}  note={this.state.selectedNote} />}
                />

                <Route exact path="/note"
                   render={routeProps =>  <AddNote  persistNote={this.addNote} deleteNote={this.deleteNote} note={this.getEmptyNote()}/>}
                />
            </div>)
    }

    render() {
        return (
            <div className="notesApp container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        {this.renderLeftMenu()}
                    </div>
                    <div className="col-md-6">
                        {this.setComponentRoutes()}
                    </div>
                </div>
            </div>
        );
    }
}

export default NotesApp;