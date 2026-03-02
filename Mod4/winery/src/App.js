//import logo from './logo.svg';
import './App.css';
import './components/hola';
import Hola from './components/hola';
import Welcome from './components/welcome';

function App() {
  return (
    <div className="App">
      <Hola name = "Bob" superhero="BobMan"/>
      <Welcome/>
    </div>
  );
}

export default App;
