import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button,
  Checkbox,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";

function MyPages() {
  const [pages, setPages] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showState, setShowState] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
          }
      };

      const response = await axios.get("http://localhost:3001/pages/myPages",config);
      setPages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  let navigate = useNavigate();

  const handleViewPage = (pageId) => {
    navigate(`../pages/${pageId}`);
    //console.log("Visualizar página com ID:", pageId);
  };

  const handleEditPage = (pageId) => {
    navigate(`../editPage/${pageId}`);
    console.log("Editar página com ID:", pageId);
  };

  const handleApprovePage = async (pageId) => {
    try {
      const token = localStorage.getItem("token");
      const editedState = 2
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const updateData = {
        state : editedState
      };
      
      const response = await axios.put(`http://localhost:3001/pages/${pageId}`, updateData, config);

      if (response.status === 200 ) {
        fetchPages(); // Chama a função para buscar as páginas novamente
      }

    } catch (err) {
      console.error("Erro ao aprovar página:", err);
    }
    console.log("Aprovar página com ID:", pageId);
  };

  const handleRejectPage = async (pageId) => {
    try {
      const token = localStorage.getItem("token");
      const editedState = 1
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const updateData = {
        state : editedState
      };
      
      const response = await axios.put(`http://localhost:3001/pages/${pageId}`, updateData, config);

      if (response.status === 200 ) {
        fetchPages(); // Chama a função para buscar as páginas novamente
      }

    } catch (err) {
      console.error("Erro ao rejeitar página:", err);
    }
    console.log("Aprovar página com ID:", pageId);
  };

  const handleToggleFilter = () => {
    setShowState(!showState);
  };

  const handleTogglePageSelection = (pageId) => {
    const selectedIndex = selectedPages.indexOf(pageId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedPages, pageId];
    } else if (selectedIndex === 0) {
      newSelected = selectedPages.slice(1);
    } else if (selectedIndex === selectedPages.length - 1) {
      newSelected = selectedPages.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedPages.slice(0, selectedIndex),
        ...selectedPages.slice(selectedIndex + 1),
      ];
    }

    setSelectedPages(newSelected);
  };

  const isSelected = (pageId) => selectedPages.indexOf(pageId) !== -1;

  const determineContrastColor = (backgroundColor) => {
    // Converte a cor hexadecimal para RGB
    const rgb = parseInt(backgroundColor.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    // Calcula o coeficiente de luminância para determinar se o texto deve ser claro ou escuro
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 128 ? "#ffffff" : "#000000"; // Retorna branco se o fundo for escuro, caso contrário, preto
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontSize: 20,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Typography variant="h4" gutterBottom style={{ color: "#ffffff" }}>
          Moderação de páginas
        </Typography>
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
  <Typography variant="body2" style={{ marginRight: "10px", color: "#ffffff" }}>
    Mostrar páginas aprovadas
  </Typography>
  <Switch
    checked={showState}
    onChange={handleToggleFilter}
  />
  <div style={{ marginLeft: "auto" }}>
    <Button variant="contained" size="small" onClick={() => console.log("Enviar páginas selecionadas:", selectedPages)}>Ativar todas páginas selecionadas</Button>
  </div>
</div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: "18px", borderRight: "1px solid #616161", color: "#ffffff" }}>Título</TableCell>
                <TableCell style={{ fontSize: "18px", color: "#ffffff" }}>Estado</TableCell>
                <TableCell style={{ fontSize: "18px", color: "#ffffff" }}>Ações</TableCell>
                <TableCell style={{ fontSize: "18px", color: "#ffffff" }}>Selecionar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages
                .filter((page) => (!showState && page.state !== 2) || (showState && page.state === 2)) // Ajuste na lógica de filtragem
                .map((page) => {
                  const isItemSelected = isSelected(page.id);
                  const labelId = `enhanced-table-checkbox-${page.id}`;
                  const textColor = determineContrastColor(
                    page.state === 0 ? "#2E7D32" : page.state === 1 ? "#C62828" : page.state === 3 ? "#FFD600" : page.state === 4 ? "#FFF59D" : "#1E88E5"
                  );

                  return (
                    <TableRow key={page.id} style={{ backgroundColor: page.state === 0 ? "#2E7D32" : page.state === 1 ? "#C62828" : page.state === 3 ? "#FFD600" : page.state === 4 ? "#FFF59D" : "#1E88E5" }}>
                      <TableCell style={{ borderRight: "1px solid #616161", color: textColor }}>{page.title}</TableCell>
                      <TableCell style={{ color: textColor }}>
                        {page.state === 0 ? "Aguardando aprovação" : page.state === 1 ? "Rejeitado" : page.state === 2 ? "Aprovado" : page.state === 3 ? "Em revisão" : "Revisada"}
                      </TableCell>
                      <TableCell>
                      <IconButton onClick={() => handleViewPage(page.id_pages)}>
                        <VisibilityIcon style={{ color: textColor }} />
                      </IconButton>
                      <IconButton onClick={() => handleEditPage(page.id_pages)}>
                        <EditIcon style={{ color: textColor }} />
                      </IconButton>
                      <IconButton //APROVAR
                        onClick={() => handleApprovePage(page.id_pages)}
                        disabled={page.state !== 4   }
                      >
                        <ThumbUpIcon style={{ color: textColor, opacity: page.state !== 4   ? 0 : 1 }} />
                      </IconButton>
                    </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleTogglePageSelection(page.id)}
                          inputProps={{ "aria-labelledby": labelId }}
                          style= {{ color: textColor }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}

export default MyPages;
