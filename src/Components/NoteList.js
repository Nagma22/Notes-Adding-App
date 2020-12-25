import { Component } from "react";
import { NavLink } from "react-router-dom";
import '../Styles/notesApp.css'

class NoteList extends Component {
  
    render() {
        if (!this.props.notes || this.props.notes.length === 0) {
            return (<div>There are no notes</div>)
        }


        const listItems = this.props.notes.map( (note) =>
            <NavLink activeClassName='active' to={`/note/${note.id}`}
                     className="list-group-item"
                     key={note.id.toString()}
                      onClick={this.props.viewNote.bind(this, note.id)}>
                <div className="text-truncate info">{note.title}</div> 
            </NavLink>
        
        )
        return (
            <ul className="list-group text-field">{listItems}</ul>
        )
    }
}

export default NoteList;