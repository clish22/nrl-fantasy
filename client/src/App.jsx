import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Admin from './pages/Admin';
import Test from './pages/Test';
import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar';

// App component with links to Home, Teams, Players, and Admin pages
function App() {
  return (
    <>
      <CustomNavbar />
      <div className="container text-center my-3">
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/players" element={<Players />} />;
          <Route path="/teams" element={<Teams />} />;
          <Route path="/admin" element={<Admin />} />;
          <Route path="/test" element={<Test />} />;
        </Routes>
      </div>
    </>
  );
}

export default App;
