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
      <a onClick={() => handleClick("/createPage")} className="redirect" style={{ cursor: 'pointer', color: 'white', display: 'block', marginBottom: '10px' }}>
        Criar pagina
      </a>
    </div>
  );
}

export default Home;
