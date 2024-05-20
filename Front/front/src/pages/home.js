import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <a onClick={() => handleClick("/site1")} className="redirect" style={{ cursor: 'pointer', color: 'white', display: 'block', marginBottom: '10px' }}>
        Esta é a página da carrot
      </a>
      <a onClick={() => handleClick("/site2")} className="redirect" style={{ cursor: 'pointer', color: 'white', display: 'block', marginBottom: '10px' }}>
        Esta é a pagina do universo
      </a>
      <a onClick={() => handleClick("/site3")} className="redirect" style={{ cursor: 'pointer', color: 'white', display: 'block', marginBottom: '10px' }}>
        É O FORST B)
      </a>
      <a onClick={() => handleClick("/site4")} className="redirect" style={{ cursor: 'pointer', color: 'white', display: 'block', marginBottom: '10px' }}>
        THE HEAT DEATH OF THE UNIVERSE
      </a>
    </div>
  );
}

export default Home;
