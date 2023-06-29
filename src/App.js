import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import SideBar from './SideBar';
import Body from './Body';

function App() {
  return (
    <div className="bg-white h-screen">
      <header className="">
        <Navbar />
        <Body />
      </header>
    </div>
  );
}

export default App;
