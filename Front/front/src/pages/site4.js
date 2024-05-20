import React, { useState } from "react";
import { Grid, Box, TextField, Button } from "@mui/material";
import Img1 from "../images/Img1Site4.png";
import Img2 from "../images/Img2Site4.png";

function Site3() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        username: "Nome do usuário",
        text: comment
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2,
              overflow: "hidden",
              backgroundColor: "#2D4263",
              border: "1px solid white",
              color: "white",
              borderRadius: "20px",
            }}
          >
            <h2>Carrot</h2>
            <p>Essa é a carrot (cenoura) do one piece</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Img1}
              alt="Imagem 1"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "cover",
                border: "1px solid white",
                borderRadius: "20px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Img2}
              alt="Imagem 2"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "cover",
                border: "1px solid white",
                borderRadius: "20px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2,
              overflow: "hidden",
              border: "1px solid white",
              backgroundColor: "#2D4263",
              color: "white",
              borderRadius: "20px",
            }}
          >
            <h2>Cenoura</h2>
            <p>Esta é uma cenoura que não é personagem de one piece</p>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 2,
              border: "1px solid white",
              color: "white",
              backgroundColor: "#2D4263",
              borderRadius: "20px",
            }}
          >
            <h2>Literalmente o mesmo nome</h2>
            <p>Como é possivel</p>
            <p>Literalmente o mesmo nome</p>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: 2,
            }}
          >
            <TextField
              label="Deixe seu comentário"
              variant="outlined"
              fullWidth
              value={comment}
              onChange={handleCommentChange}
              sx={{ input: { color: "white" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } }, "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "gray" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "white" }, "& .MuiInputLabel-root": { color: "white" }, "& .MuiInputLabel-root.Mui-focused": { color: "white" }, "& .MuiOutlinedInput-root input": { color: "white" } }}
            />
            <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
              Postar Comentário
            </Button>
            <Box>
              {comments.map((c, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid white",
                    borderRadius: "5px",
                    padding: 1,
                    backgroundColor: "#341724",
                    marginTop: 1,
                    color: "white",
                  }}
                >
                  <strong>{c.username}</strong>
                  <p>{c.text}</p>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Site3;
