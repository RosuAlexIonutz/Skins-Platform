import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
    <div className="navbar">
        <h1>Skins platform</h1>
        <img src={require('./image/talondamascus.png')} height={200} width={300} />
        <img src={require('./image/karambitdoppler.png')} height={200} width={300} />
        <img src={require('./image/skeletonfade.png')} height={200} width={300} />
        <img src={require('./image/m9marblefade.png')} height={200} width={300} />
        <h2>
        <Link to="/">Skinuri</Link>
        {/*<Link to="/home"> Home </Link>*/}
        <Link to="/players"> Jucatori </Link>
        <Link to="/aplicatii"> Aplicatii </Link>
        </h2>
      </div> 
      
    );
}

export default Navbar;