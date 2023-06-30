import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import SideBar from './SideBar';
import Body from './Body';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="bg-white h-screen">
      <header className="">
        <Navbar />
        <Outlet />
      </header>
    </div>
  );
}

export default App;
