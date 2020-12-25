import { Component } from "react";
import { Redirect } from 'react-router';
import nl2br from 'react-newline-to-break';

class ReadNote extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect : false
        };
        this.deleteNote = this.deleteNote.bind(this);

    }

    deleteNote(event){
        event.preventDefault();
        this.props.deleteNote(this.props.note.id);
    }

    render() {
        if (this.state.redirect || !this.props.note) {
            return <Redirect push to="/" />;
        }
        return (
            <div className="card">
                <div className="card-header bg-dark">
                    <h4 className="text-color">{this.props.note.title}</h4>
                </div>
                <div className="card-body">
                    <p className="card-text">{nl2br(this.props.note.description)}</p>
                    <button onClick={this.deleteNote} className="btn btn-danger">Delete Note</button>
                </div>
            </div>
        );
    }
}

export default ReadNote;