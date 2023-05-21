
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Button, Popover, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((data)=>data);
  console.log(state);
  const [productsInCart,setProductsInCart] = useState(state.data.cartItems || {})
    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(3),
          width: "auto",
        },
      }));
    
      const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6CA516",
        color: "white",
      }));
    
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(7)})`,
          transition: theme.transitions.create("width"),
          width: "100%",
          [theme.breakpoints.up("md")]: {
            width: "70ch",
          },
        },
      }));
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);

      const showCartItems = () =>{
        setProductsInCart(`<div>Hello</div>`);
      }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ background: "white", color: "black" }}>
      <Toolbar sx={{ padding: "20px", height: "80px" }}>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "40px",
            display: "flex",
          }}
        >
          <PhoneOutlinedIcon sx={{ color: "black", marginLeft: "10px" }} />
          <Typography>1860 123 1000</Typography>
          <LocationOnOutlinedIcon sx={{ marginLeft: "10px" }} />
          <Typography>560004,Bangalore</Typography>
          <PersonOutlineOutlinedIcon sx={{ marginLeft: "10px" }} />
          <Typography>Login/Sign Up</Typography>
        </div>
        <img
          src="https://www.bbassets.com/static/v2662/custPage/build/content/img/bb_logo.png"
          alt="bb"
        />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ border: "1px solid black", color: "black" }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />
        <div>
        <ShoppingBasketIcon sx={{ color: "#DA251D" }} />
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        My Basket
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{ p: 1 }} onClick={showCartItems}>{productsInCart}</div>
      </Popover>
    </div>
        {/* <ShoppingBasketIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
      </Toolbar>
    </AppBar>
   
    
  </Box>
  )
}

export default Header