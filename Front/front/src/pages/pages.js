import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function Pages() {
  const { id } = useParams();
  const [pageTitle, setPageTitle] = useState(""); // Estado para armazenar o título da página
  const [pageContent, setPageContent] = useState(""); // Estado para armazenar o conteúdo da página

  useEffect(() => {
    // Buscar dados da API
    axios.get(`http://localhost:3001/pages/${id}`)
      .then(response => {
        // Extrair o título e o conteúdo da resposta
        const { title, content } = response.data;
        // Atualizar os estados com os dados obtidos
        setPageTitle(title);
        setPageContent(content);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da página:", error);
      });
  }, [id]);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Renderizar o título da página com cor branca */}
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        {pageTitle}
      </Typography>
      {/* Renderizar o conteúdo da página com cor branca */}
      <Typography variant="body1" sx={{ color: "white" }}>
        {pageContent}
      </Typography>
    </Box>
  );
}

export default Pages;
