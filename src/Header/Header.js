import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Icon,
  Input,
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ClearIcon from "@mui/icons-material/Clear";

const Header = () => {
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((data) => data);
  const [cartItems, setCartItems] = useState([]);
  const [productsInCart, setProductsInCart] = useState({});
  useEffect(() => {
    if (state.data && state.data.cartItems) {
      setProductsInCart(state.data.cartItems);
    }
  }, [state.data]);
  useEffect(() => {
    let cartItems = showItemsInCart();
    setTotalProductsInCart(cartItems.length)
    setCartItems(cartItems);
  }, [productsInCart]);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const incrementCount = (id, unitIndex) => {
    let cartItems = JSON.parse(JSON.stringify(productsInCart));
    cartItems[id][unitIndex]["quantity"] =
      cartItems[id][unitIndex]["quantity"] + 1;
    setProductsInCart(cartItems);
  };

  const decrementCount = (id, unitIndex) => {
    let cartItems = JSON.parse(JSON.stringify(productsInCart));
    cartItems[id][unitIndex]["quantity"] = Math.max(
      cartItems[id][unitIndex]["quantity"] - 1,
      1
    );
    setProductsInCart(cartItems);
  };

  const showItemsInCart = () => {
    const cartItems = productsInCart;
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
          unitIndex: vIndex,
          unit: productDetail.units[vIndex].unit,
          quantity: cartItems[pIndex][vIndex]["quantity"],
        };

        products.push({ ...cartProductObject, ...variantObject });
      }
    }

    // setTotalProductsInCart(products.length)
    return products;
  };
  let handleChange = (e) => {
    setQuantity(e.target.value);
  };
  function removeCartItem(pIndex, unitIndex) {
    let oldProductsInCart = JSON.parse(JSON.stringify(productsInCart));
    delete oldProductsInCart[pIndex][unitIndex];
    if(Object.keys(oldProductsInCart[pIndex]).length === 0) {
      delete oldProductsInCart[pIndex];
    }
    setProductsInCart(oldProductsInCart);
  }

  const calculateSubtotal = () => {
    let subtotal = 0;

    for (const product of showItemsInCart()) {
      subtotal += product.sale_price * product.quantity;
    }

    return subtotal.toFixed(2);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <a href="/">
            <img
              src="https://www.bbassets.com/static/v2662/custPage/build/content/img/bb_logo.png"
              alt="bb"
            />
          </a>
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
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              My Basket {totalProductsInCart}
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div>
                {cartItems.length > 0 ? (
                  cartItems.map((product) => (
                    <Card
                      key={product.index}
                      sx={{ display: "flex", width: "800px" }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={product.image}
                        alt="Product-image"
                      />
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography variant="h6">
                            {product.name} {product.unit}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {product.quantity}*{product.sale_price}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex" }}>
                          <div className="col-xl-1">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <button
                                  class="btn btn-outline-primary"
                                  type="button"
                                  // onClick={decNum}
                                  onClick={() =>
                                    decrementCount(
                                      product.index,
                                      product.unitIndex
                                    )
                                  }
                                >
                                  -
                                </button>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                value={product.quantity}
                                onChange={handleChange}
                              />
                              <div class="input-group-prepend">
                                <button
                                  class="btn btn-outline-primary"
                                  type="button"
                                  // onClick={incNum}
                                  onClick={() =>
                                    incrementCount(
                                      product.index,
                                      product.unitIndex
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardActions>
                        <Typography>
                          Rs {product.sale_price.toFixed(2)}
                          <div>
                            Saved Rs {product.market_price - product.sale_price}{" "}
                          </div>
                        </Typography>
                        <Button
                          onClick={() => removeCartItem(
                            product.index,
                            product.unitIndex
                          )}
                        >
                          <ClearIcon></ClearIcon>
                        </Button>
                      </Box>
                    </Card>
                  ))
                ) : (
                  <div>The Cart is Empty </div>
                )}
              </div>
              <Card>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography>
                    **Actual Delivery Charges computed at checkout{" "}
                  </Typography>
                  <Typography>
                    <div>Sub Total :{calculateSubtotal()}</div>
                    <div>Delivery Charge : **</div>
                  </Typography>
                </Box>
                <Button>View Basket and Checkout</Button>
              </Card>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
