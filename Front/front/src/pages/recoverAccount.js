import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function RecoverAccount() {
  const [email, setEmail] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      setRecoveryMessage("");
    } else {
      setEmailError(false);
      // Add logic to send recovery email
      setRecoveryMessage(`Instruções para recuperação da senha enviadas para:  ${email}`);
      // Simulating the email sending process
      setTimeout(() => {
        setRecoveryMessage("");
        setEmail("");
      }, 3000);
    }
  };

  const validateEmail = (email) => {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
      color: "#faf0e6",
    },
    input: {
      color: "#faf0e6",
      "&::placeholder": { color: "#faf0e6" },
      outline: "none",
    },
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Esqueci Senha
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? 'Informe um e-mail válido' : ''}
          style={styles.textField}
          InputLabelProps={{ style: { color: "#faf0e6", shrink: true } }}
          InputProps={{ style: styles.input }}
        />
        <Button variant="outlined" type="submit" style={styles.button}>
          Recuperar
        </Button>
      </form>
      {recoveryMessage && (
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          {recoveryMessage}
        </Typography>
      )}
    </div>
  );
}

export default RecoverAccount;
