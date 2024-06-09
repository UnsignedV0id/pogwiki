import React, { useState } from "react";
import {
  TextField,
  Typography,
  Autocomplete,
  Chip,
  Button,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  

  const categoryOptions = [
    { title: "Tecnologia" },
    { title: "Ciência" },
    { title: "Arte" },
    { title: "Negócios" },
    { title: "Saúde" },
    { title: "Educação" },
  ];

  const styles = {
    container: {
      backgroundColor: "#191919",
      color: "#faf0e6",
      padding: "20px",
      borderRadius: "10px",
    },
    button: {
      border: "2px solid #ECDBBA",
      color: "#ECDBBA",
      marginTop: "20px",
    },
    textField: {
      backgroundColor: "#2D4263",
      color: "#fff",
      marginBottom: "20px",
    },
    input: {
      color: "#fff", // Text color
      "&::placeholder": { color: "#fff" }, // Placeholder color
    },
    label: {
      color: "#fff",
      shrink: true,
    },
  };

  const handleSave = async () => {
    try {
      // Recupera o token do localStorage
      const token = localStorage.getItem("token");
      const userid = jwtDecode(token).id;
      const data = {
        title: title,
        content: content,
        creator: userid,
      };
      console.log("token: ", token);
      // Faz a requisição com o header de autenticação
      const response = await axios.post("http://localhost:3001/pages", data);

      console.log(response);

    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("Recurso não encontrado (404).");
      } else {
        console.log(err.response);
      }
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Criar nova página
      </Typography>

      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        style={styles.textField}
        InputLabelProps={{ style: styles.label }}
        InputProps={{ style: styles.input }}
      />

      <TextField
        label="Conteúdo"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        style={styles.textField}
        InputLabelProps={{ style: styles.label }}
        InputProps={{ style: styles.input }}
      />

      <Button variant="outlined" style={styles.button} onClick={handleSave}>
        Salvar
      </Button>
    </div>
  );
}

export default CreatePage;
