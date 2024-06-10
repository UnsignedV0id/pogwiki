import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importe useNavigate
import axios from "axios";
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import { jwtDecode } from "jwt-decode";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Utilize useNavigate para navegação
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/pages/${id}`)
      .then(response => {
        const { title, content } = response.data;
        setPageTitle(title);
        setPageContent(content);
        setEditedTitle(title);
        setEditedContent(content);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da página:", error);
      });
  }, [id]);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const editedState = jwtDecode(token).type === 0 ? 3 : 4 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const updateData = {
        title: editedTitle,
        content: editedContent,
        state : editedState
      };
      
      const response = await axios.put(`http://localhost:3001/pages/${id}`, updateData, config);

      if (response.status === 200 ) {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate(-1); // Use navigate para redirecionar
        }, 3000);
      }

    } catch (err) {
      console.error("Erro ao atualizar página:", err);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const styles = {
    container: {
      backgroundColor: "#191919",
      color: "#faf0e6",
      padding: "20px",
      borderRadius: "10px",
    },
    textField: {
      backgroundColor: "#2D4263",
      color: "#fff",
      marginBottom: "15px",
    },
    input: {
      color: "#fff",
      "&::placeholder": { color: "#fff" },
    },
    button: {
      border: "2px solid #ECDBBA",
      color: "#ECDBBA",
      marginBottom: "15px",
    },
    blueText: {
      color: "white",
    },
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <div style={styles.container}>
        <TextField
          label="Título"
          value={editedTitle}
          onChange={handleTitleChange}
          fullWidth
          style={styles.textField}
          InputProps={{ style: { ...styles.input, outline: "none" } }}
          InputLabelProps={{ style: styles.blueText }}
        />
        <TextField
          label="Conteúdo"
          value={editedContent}
          onChange={handleContentChange}
          multiline
          rows={4}
          fullWidth
          style={styles.textField}
          InputProps={{ style: { ...styles.input, outline: "none" } }}
          InputLabelProps={{ style: styles.blueText }}
        />
        <Button variant="outlined" onClick={handleSave} style={styles.button}>
          Editar
        </Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Página atualizada com sucesso"
      />
    </Box>
  );
}

export default EditPage;
