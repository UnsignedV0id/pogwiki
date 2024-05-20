// Importando useState e Dialog como useStateDialog
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

function CreateAccount() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const [highlightFields, setHighlightFields] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const fieldsToHighlight = [];
      debugger;
      if (password !== confirmPassword) {
        setPasswordMatch(false);
        fieldsToHighlight.push("confirmPassword");
        return;
      } else {
        setPasswordMatch(true);//caso o usuarui erre a senha e em seguida acerte é necessario apertar o botao de confirmar duas vezes \
        //pois mesmo chamando essa funçao a variavel nao é alterada para true
      }
      if (!user) fieldsToHighlight.push("user");
      if (!password) fieldsToHighlight.push("password");
      if (!confirmPassword) fieldsToHighlight.push("confirmPassword");
      if (!email) fieldsToHighlight.push("email");
      if (!agreedTerms) fieldsToHighlight.push("agreedTerms");
  
      setHighlightFields(fieldsToHighlight);
  
      if (user && password && confirmPassword && email && agreedTerms && passwordMatch) {
        setUser("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setAgreedTerms(false);
        setHighlightFields([]);
        setOpenTermsDialog(false); // Close terms dialog if open
        setShowConfirmation(true);
      } else {
        setShowConfirmation(false);
      }
    };

  const handleTermsDialogOpen = () => {
    setOpenTermsDialog(true);
  };

  const handleTermsDialogClose = () => {
    setOpenTermsDialog(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleTermsClick = () => {
    handleTermsDialogOpen();
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
    },
    textField: {
      backgroundColor: "#2D4263",
      color: "#fff",
    },
    input: {
      color: "#fff", // Text color
      "&::placeholder": { color: "#fff" }, // Placeholder color
    },
    label: {
      color: "#fff",
      shrink: true,
    },
    dialog: {
      backgroundColor: "#000",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Create Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{
            ...styles.textField,
            border: highlightFields.includes("user") ? "1px solid red" : "",
          }}
          InputLabelProps={{ style: styles.label }}
          InputProps={{ style: { ...styles.input, outline: "none" } }}
        />
        <TextField
          label="Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...styles.textField,
            border: highlightFields.includes("password") ? "1px solid red" : "",
          }}
          InputLabelProps={{ style: styles.label }}
          InputProps={{ style: { ...styles.input, outline: "none" } }}
        />
        <TextField
          label="Confirme Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!passwordMatch}
          helperText={!passwordMatch ? "As senhas não coincidem" : ""}
          style={{
            ...styles.textField,
            border: highlightFields.includes("confirmPassword") ? "1px solid red" : "",
          }}
          InputLabelProps={{ style: styles.label }}
          InputProps={{ style: { ...styles.input, outline: "none" } }}
        />
        <TextField
          label="Endereço de Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...styles.textField,
            border: highlightFields.includes("email") ? "1px solid red" : "",
          }}
          InputLabelProps={{ style: styles.label }}
          InputProps={{ style: { ...styles.input, outline: "none" } }}
        />
        <FormControlLabel
          control={
            <Checkbox
              required
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
            />
          }
          label={
            <span
              style={{
                color: "#fff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleTermsClick}
            >
              Li e concordo com os termos de condições
            </span>
          }
          style={{ color: "#fff" }}
        />
        <Button
          type=" "
          variant="outlined"
          style={styles.button}
          disabled={!agreedTerms} // Disable button if terms are not agreed or passwords don't match
        >
          Criar Conta
        </Button>
      </form>

      <Dialog
        open={openTermsDialog}
        onClose={handleTermsDialogClose}
        PaperProps={{ style: styles.dialog }}
      >
        <DialogTitle>Termos</DialogTitle>
        <DialogContent>
          {/* Add your terms and conditions text here */}
          <Typography variant="body1">Prometo ser muito legal.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            A confirmation email has been sent to {email}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateAccount;
