import React, { useState } from 'react';
import { NestedMenuItem } from 'mui-nested-menu';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Menu,MenuItem} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from "react-router-dom";





function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  let navigate = useNavigate(); 
  const routeChange = function(path) {  
    handleClose();
    navigate(path);
  }

  return (
    <header>
      <div id="#mainHeader" style={{display:'inline-flex'}}>
          <div id="#indexMenu">
              <Button onMouseOver={handleClick}>
                Index
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <NestedMenuItem label="Primeiro Menu"parentMenuOpen={open}>
                  <MenuItem onClick= {() => routeChange("/sobre")}  >About!</MenuItem>
                  <MenuItem onClick= {() => routeChange("/servicos")}  >Servicos!</MenuItem>
                  <NestedMenuItem rightIcon={<ArrowRightIcon />} label="Prox Menu!"parentMenuOpen={open}>
                    <MenuItem onClick={() => routeChange("/contato")}>Standard Menu Item!</MenuItem>
                  </NestedMenuItem>
                </NestedMenuItem>
              </Menu>
          </div>
          <div id='#searchBar' style={{marginLeft:'10px'}}>
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={['1', '11','2','22']}
                  sx={{
                     width: 300 ,
                     input: { color: 'red' },
                     "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "primary.main",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "cyan", // Change to the desired hover color
                     }
                    }}
                  renderInput={(params) => <TextField {...params} label="Pages" />}
                />
          </div>
        </div>
    </header>
  );
}

export default Header;