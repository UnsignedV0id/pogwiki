import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NestedMenuItem } from "mui-nested-menu";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuIcon from '@mui/icons-material/Menu';

import logo from "../images/logo.gif";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  let navigate = useNavigate();
  const routeChange = function (path) {
    handleClose();
    navigate(path);
  };

  const LoginTheme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottom: "2px solid white",
            },
            "&:hover:before": {
              borderBottom: "2px solid gray",
            },
            "&:after": {
              borderBottom: "2px solid white",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid gray",
            },
          },
        },
      },
    },
  });

  return (
    <header>
      <div
        id="#mainHeader"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <div id="#indexMenu">
            <Button
              variant="text"
              style={{ color: "white" }} 
              startIcon={<MenuIcon />}
              onMouseOver={handleClick}
            >
              Index
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <NestedMenuItem label="Primeiro Menu" parentMenuOpen={open}>
                <MenuItem onClick={() => routeChange("/sobre")}>
                  About!
                </MenuItem>
                <MenuItem onClick={() => routeChange("/servicos")}>
                  Servicos!
                </MenuItem>
                <NestedMenuItem
                  rightIcon={<ArrowRightIcon />}
                  label="Prox Menu!"
                  parentMenuOpen={open}
                >
                  <MenuItem onClick={() => routeChange("/contato")}>
                    Standard Menu Item!
                  </MenuItem>
                </NestedMenuItem>
              </NestedMenuItem>
            </Menu>
          </div>
          <div id="#searchBar" style={{ marginLeft: "110px" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["1", "11", "2", "22"]}
              sx={{
                width: 300,
                input: { color: "white" },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "gray",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pesquisa"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </div>
        </div>
        <div id="logoImage" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Pogwiki Logo"
            style={{ cursor: "pointer", height: "100%", width: "100%" }}
            onClick={() => routeChange("/")}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ThemeProvider theme={LoginTheme}>
            <div
              id="LoginArea"
              style={{
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <TextField
                id="Login"
                label="Login"
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  input: { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottom: "2px solid white",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid gray",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "2px solid white",
                  },
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    borderBottom: "2px solid gray",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => routeChange("/createAccount")}
              >
                Criar nova conta
              </Typography>
            </div>
            <div
              id="SenhaArea"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginRight: "10px",
                }}
              >
                <TextField
                  id="Senha"
                  label="Senha"
                  type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    input: { color: "white" },
                    "& .MuiInput-underline:before": {
                      borderBottom: "2px solid white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottom: "2px solid gray",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "2px solid white",
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                      borderBottom: "2px solid gray",
                    },
                  }}
                  InputProps={{
                    // Add InputProps for visibility toggle
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                          edge="end"
                          sx={{ color: "white" }}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => routeChange("/recoverAccount")}
                >
                  Esqueci senha
                </Typography>
              </div>
              <Button
                variant="text"
                style={{ color: "white" }} // Add custom style for white color
                startIcon={<LoginIcon />}
                onClick={() => routeChange("/login")}
              >
                Login
              </Button>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </header>
  );
}

export default Header;
