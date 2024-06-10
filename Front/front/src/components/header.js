import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NestedMenuItem } from "mui-nested-menu";
import { jwtDecode } from "jwt-decode";
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
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from 'axios';

import logo from "../images/logo.gif";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [options, setOptions] = useState([]);

  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  let navigate = useNavigate();
  const routeChange = (path) => {
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



  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      navigate(`pages/${newValue.value}`);
    }
  };

  useEffect(() => {

    //pegar array de paginas existentes
    axios.get('http://localhost:3001/pages/approved')
    .then(response => {
    let tempData  = response.data.map(({ id_pages, title }) => ({ value: id_pages, label: title }));;

    setOptions(tempData);
    })
    .catch(error => {
    console.error('Error fetching options:', error);
    });

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        setLoggedInUser(decodedToken.username); 
        setIsAdmin(decodedToken.type == 1 ); 
        setIsLoggedIn(true);
        
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleLoginClick = async () => {
    // Reset error states
    setUsernameError(false);
    setPasswordError(false);

    // Check for empty fields
    if (username === '') {
      setUsernameError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    // If both fields are filled, make the API call
    if (username !== '' && password !== '') {
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          nome: username,  // Passa o estado do nome
          senha: password,  // Passa o estado da senha
        });

        if (response.status === 201) {
          // Handle successful login
          console.log('Login successful', response.data);
          const token = response.data?.access_token;
          if (token) {
            // Armazena o token no localStorage
            localStorage.setItem("token", response.data.access_token);
            // Atualiza o estado para mostrar que o usuário está logado
            setIsLoggedIn(true);
            setLoggedInUser(username);
            window.location.reload();
          } else {
            // Lança um erro se o token não estiver presente na resposta
            throw new Error("Token não encontrado na resposta");
          }
        } else {
          // Handle login error
          console.error('Login failed', response.data);
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    }
  };

  const handleLogoutClick = () => {
    // Limpa o token do localStorage
    localStorage.removeItem('token');
    // Atualiza o estado para mostrar que o usuário está deslogado
    setIsLoggedIn(false);
    setIsAdmin(false);
    setLoggedInUser('');
  };

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
              Menu
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {isLoggedIn && ( //Caso logado
              <NestedMenuItem label="Paginas" parentMenuOpen={open}>
                <MenuItem onClick={() => routeChange("/createPage")}>
                  Criar Paginas
                </MenuItem>
                <MenuItem onClick={() => routeChange("/myPages")}>
                  Minhas paginas
                </MenuItem>
                {isAdmin && ( //Caso adm
                  <MenuItem onClick={() => routeChange("/moderatePages")}>
                    Moderar Páginas
                  </MenuItem>
                )}
                {/* <NestedMenuItem
                  rightIcon={<ArrowRightIcon />}
                  label="Prox Menu!"
                  parentMenuOpen={open}
                >

                </NestedMenuItem> */}
              </NestedMenuItem>
            )}
            <MenuItem onClick={() => routeChange("/contato")}>
              Contato
            </MenuItem>
            </Menu>
          </div>
          <div id="#searchBar" style={{ marginLeft: "110px" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value}
              onChange={handleAutocompleteChange}
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
        <div style={{ display: "flex", alignItems: "center" , width:'530px'}}>
          {isLoggedIn ? (
            <>
              <Typography variant="h6" style={{ color: "white", marginLeft: 'auto' }}>
                {loggedInUser}
              </Typography>
              <IconButton 
                style={{ color: "white" }}
                onClick={handleLogoutClick}
              >
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={usernameError}
                  helperText={usernameError ? 'Informe Login' : ''}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordError ? 'Informe senha' : ''}
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
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              </div>
            </ThemeProvider>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
