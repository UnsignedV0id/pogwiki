import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';

function Home() {
  const navigate = useNavigate();
  const [recentPages, setRecentPages] = useState([]);
  const [loaded, setLoaded] = useState(false); 
  
  //Atualiza ulimas 5 paginas aprovadas
  useEffect(() => {
    axios.get('http://localhost:3001/pages/approved')
      .then(response => {
        const sortedPages = response.data.sort((b,a) => a.id - b.id);
        const lastFivePages = sortedPages.slice(-5);
        setRecentPages(lastFivePages);
        setLoaded(true); 
      })
      .catch(error => {
        console.error('Erro ao obter as páginas:', error);
      });
  }, []);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: "inline-flex" }}>
      <div className="intro-container" style={{
          'background-color': 'rgb(200, 200, 200)',
          width: '65vw',
          height: '60vh',
          padding: '20px',
          'border-radius': '30px',
          fontSize: '175%' 
        }}>
        <h1>Bem-vindo à PogWiki</h1>
        <p>
          Somos uma wiki dinâmica com cadastro e moderação de páginas customizadas em formato markup.
        </p>
        <p>
          Acesse o menu no canto superior esquerdo para cadastrar sua primeira página.
        </p>
        <p>
          Apenas usuários logados podem criar novas páginas! Faça sua conta no canto superior direito.
        </p>
      </div>
      <div className="recent-pages-container" style={{ display: loaded ? 'block' : 'none' }}>
        <div style={{
          'background-color': 'rgb(200, 200, 200)',
          width: '24vw',
          'margin-left': '10px',
          padding: '20px',
          'border-radius': '30px',
        }}>
          <h2 style={{ color: 'black' }}>Últimas páginas:</h2>
          <ul style={{ fontSize: '1.2em', listStyleType: 'none', padding: 0 }}>
            {recentPages.slice().reverse().map(page => (
              <li key={page.id_pages} style={{ marginBottom: '10px' }}>
                <a onClick={() => handleClick(`/pages/${page.id_pages}`)} className="redirect" style={{ cursor: 'pointer', textDecoration: 'none', color: '#333' }}>
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
