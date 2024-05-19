import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Players from './pages/Players';
import Skins from './pages/Skins';
import Aplicatii from './pages/Aplicatii';

 function App() {
  return (
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Skins />} />
        <Route path="/players" element={<Players />} />
        <Route path="/aplicatii" element={<Aplicatii />} />
      </Routes>
        </Router>
  );
}

export default App;