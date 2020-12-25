import { Component } from "react";
import '../Styles/notesApp.css';


class AddNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect : false
        };
        this.saveNote = this.saveNote.bind(this);
    }

    saveNote(event) {
        event.preventDefault();

        if (this.title.value === "") {
            alert("Note: (Both) Title and Description Needed");
        } else {
            const note = {
                // id: Number(this.id.value),
                title: this.title.value,
                description: this.description.value
            }
            this.props.persistNote(note);
            this.setState({redirect: true});
        }  
    }

    renderFormButtons() {
        if (this.props.note.id !== undefined) {
            return (<div>
                <button type="submit" className="btn btn-success float-right">Save Note</button>
                <button onClick={this.deleteNote} className="btn btn-danger">Delete Note</button>
            </div>);
        }
        return (

            <button type="submit" className="btn btn-success float-right">Save Note</button>
        );
    }

    render() {
        return (
            <div>
                <div className="card border-override">
                        <div className="card-header bg-dark text-color">Add Note</div>
                    <div className="card-body">
                        <form ref="noteForm" onSubmit={this.saveNote}>
                            <div className="form-group">
                                <p><input className="form-control text-field" ref={title => this.title = title}
                                        defaultValue={this.props.note.title}
                                        placeholder="Your title Goes Here"/></p>

                                <p><textarea className="form-control text-field" rows="10"
                                                ref={description => this.description = description}
                                                defaultValue={this.props.note.description} placeholder="Enter description"/>
                                </p>
                            </div>
                            {this.renderFormButtons()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNote;