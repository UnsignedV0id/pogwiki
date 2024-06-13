import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
  
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

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setTitle("");
    setContent("");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userid = jwtDecode(token).id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const data = {
        title: title,
        content: content,
        creator : 99999
      };
      
      const response = await axios.post("http://localhost:3001/pages", data, config);

      if (response.status === 201) {
        setShowConfirmation(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("Recurso não encontrado (404).");
      } else {
        console.log(err);
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

      <ReactMde
        value={content}
        onChange={setContent}
        selectedTab="write"
        onTabChange={() => {}}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />

      <Button variant="outlined" style={styles.button} onClick={handleSave}>
        Salvar
      </Button>

      <Dialog open={showConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Nova página!</DialogTitle>
        <DialogContent>
          <Typography>
            |{title}| criada com sucesso.
          </Typography>
          <Typography>
            Aguarde a aprovação de um adm.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Eba!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePage;
