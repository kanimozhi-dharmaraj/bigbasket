import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Products.json";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((data) => data);
  console.log(state);
  const [productsInCart, setProductsInCart] = useState(
    state.data.cartItems || {}
  );
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

  const showItemsInCart = () => {
    const cartItems = state.data.cartItems;
    const products = [];
    for (const pIndex in cartItems) {
      //Products
      let productDetail = Products.filter(
        (product) => parseInt(product.index) === parseInt(pIndex)
      ).pop();
      let cartProductObject = {
        index: productDetail.index,
        name: productDetail.product,
        market_price: productDetail.market_price,
        sale_price: productDetail.sale_price,
        image: productDetail.image,
      };

      for (const vIndex in cartItems[pIndex]) {
        //Variants
        let variantObject = {
          unit: productDetail.units[vIndex].unit,
          quantity: cartItems[pIndex][vIndex]["quantity"],
        };
        products.push({ ...cartProductObject, ...variantObject });
      }
    }
    return products;
  };

  const open = Boolean(anchorEl);
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
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              My Basket
            </Typography>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <div>
                {showItemsInCart().map((product) => (
              //     <div key={index}>
              //       <div><img src={product.image} alt="product-img"></img></div>
              //       <div>{product.name} 
              //       {product.unit}
              //        {product.quantity}</div>
              //     </div>
              //   ))}
              // </div>
              <Card sx={{ display: 'flex' }}>
              
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={product.image}
                alt="Product-image"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h6">
                    {product.name} {product.unit}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {product.quantity}
                  </Typography>
                </CardContent>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box> */}
              </Box>
            </Card>))}
    </div>
            </Popover>
          </div>
          {/* <ShoppingBasketIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
