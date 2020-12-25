import './App.css';
import './Styles/notesApp.css'
import NotesApp from './Components/NotesAPP';
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <div className="container-fluid bg-info">
            <h1 className="text-center display-1 header-title text-color">Creating Notes</h1>
            <hr/>
        </div>
      <div>
        <BrowserRouter>
          <Route path="/" component={NotesApp} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
