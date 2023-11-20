import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Products from "../Products.json";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ITEMS } from "../Redux/stateSlice";

const Home = () => {
  const [items, setItems] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [salePrices, setSalePrices] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const localStorageKey = "productState";

  const loadCartItemsFromStorage = () => {
    try {
      const serializedState = localStorage.getItem(localStorageKey);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };

  function convertObject(inputObject) {
    const resultObject = {};

    for (const key in inputObject) {
      if (inputObject.hasOwnProperty(key)) {
        if (typeof inputObject[key] === 'object' && inputObject[key] !== null) {
          if (inputObject[key].hasOwnProperty(0) && inputObject[key][0].hasOwnProperty('quantity')) {
            resultObject[key] = { 0: inputObject[key][0].quantity };
          }
        }
      }
    }

    return resultObject;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((data)=>data);
  const [counters, setCounters] = useState(convertObject(loadCartItemsFromStorage() || state.data.cartItems || {}));
  const [productsInCart, setProductsInCart] = useState(loadCartItemsFromStorage() || state.data.cartItems || {});
  const chooseVariant = (e) => {
    const value = e.target.value;
    const [index, unit] = value.split('-');
    setSelectedVariants(prevVariants => ({
      ...prevVariants,
      [index - 1]: Number(unit),
    }));
  };
  const incrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      const selectedVariant = selectedVariants[id] || 0;

      newCounters[id] = newCounters[id] || {};
      newCounters[id][selectedVariant] = (newCounters[id][selectedVariant] || 0) + 1;

      return newCounters;
    });
  };

  const decrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      const selectedVariant = selectedVariants[id] || 0;

      newCounters[id] = newCounters[id] || {};
      newCounters[id][selectedVariant] = Math.max((newCounters[id][selectedVariant] || 0) - 1, 0);
      return newCounters;
    });
  };

  const updateProductsInCart = () => {
    const newProductsToCart = JSON.parse(JSON.stringify(productsInCart));

    for (const pIndex in counters) {
      const unit = selectedVariants[pIndex] || 0;
      newProductsToCart[pIndex] = newProductsToCart[pIndex] || {};
      newProductsToCart[pIndex][unit] = {
        quantity: counters[pIndex][unit] || 1
      };
    }

    dispatch(UPDATE_ITEMS(newProductsToCart));
    if (JSON.stringify(newProductsToCart) === localStorage.getItem(localStorageKey)) {
      return;
    }
    setProductsInCart(newProductsToCart);

    localStorage.setItem(
      localStorageKey,
      JSON.stringify(newProductsToCart)
    )
  };
  const showProductDetails = (item) => {
    navigate(`/Product?id=${item.index}`);
  };
  const goToRelevantPage = (item) => {
    navigate(`/Filter?sub_category=${item.sub_category}`);
  };

  useEffect(() => {
    if(JSON.stringify(productsInCart) != JSON.stringify(state.data.cartItems)) {
      setProductsInCart(state.data.cartItems)
      setCounters(convertObject(state.data.cartItems))  
    }
  }, [state]);

  useEffect(() => {
    setItems(Products);
  }, [Products]);

  useEffect(() => {
    updateProductsInCart();
  }, [counters]);

  const calculatePrices = () => {
    const newMarketPrices = items.map((product, i) =>
      (product.market_price * (product.units ? product.units[selectedVariants[i] || 0]?.multiple : 1)).toFixed(2)
    );

    const newSalePrices = items.map((product, i) =>
      (product.sale_price * (product.units ? product.units[selectedVariants[i] || 0]?.multiple : 1)).toFixed(2)
    );
    setSalePrices(newSalePrices);
    setMarketPrices(newMarketPrices);
  };

  useEffect(() => {
    calculatePrices();
  }, [items, selectedVariants]);

  return (
    <div>
      <Box sx={{ overflow: "hidden" }}>
        <img
          src="https://www.bigbasket.com/media/uploads/banner_images/2305152-bbpl-staples_460_Bangalore.jpg"
          alt="banner" className="bannerImage"
        />
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {items.slice(0, 8).map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <div className="offer-box">GET {Math.round(((item.market_price - item.sale_price) / (item.market_price)) * 100)} % OFF</div>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="green iguana"
                  sx={{ height: "150px", width: "150px", paddingLeft: '60px', paddingTop: "30px" }}
                  onClick={() => showProductDetails(item)}
                />

                <img
                  src="https://www.bbassets.com/static/v2663/custPage/build/content/img/vegicon.svg"
                  alt="veg-icon" style={{ paddingLeft: "20px" }}
                ></img>

                <CardContent>
                  <div className="brandName">{item.brand}</div>
                  <div

                    className="productName"
                    onClick={() => showProductDetails(item)}
                  >
                    {item.product}
                  </div>

                  <FormControl fullWidth>
                    <Select
                      labelId={`demo-simple-select-label-${item.index}`}
                      id={`demo-simple-select-${item.index}`}
                      onChange={(e) => chooseVariant(e)}
                      defaultValue={`${item.index}-0`}
                      className="dropDownBox"
                      sx={{ color: "#666666" }}
                    >
                      {item.units.map((unitObj, unitIndex) => (
                        <MenuItem value={`${item.index}-${unitIndex}`} sx={{ color: "#666666" }} >
                          {unitObj.unit} - Rs.
                          {(item.sale_price * unitObj.multiple).toFixed(2)}
                        </MenuItem>))}
                    </Select>
                  </FormControl>
                  <div className="basket-details">
                    <div>
                      <span className="mrpPriceStyle">MRP{" "}
                        <span style={{ textDecoration: "line-through" }}></span>
                        Rs. {marketPrices[i]}
                      </span>{" "}
                      <span className="salePriceStyle">Rs.{salePrices[i]} </span>
                    </div>
                    <Typography className="DeliveryDetail">
                      <img
                        src="https://www.bbassets.com/static/v2662/custPage/build/content/img/standard-del-gray.svg"
                        className="transport"
                        alt="transport"
                      ></img>

                      <p className="deliveryTime">
                        <span>Standard Delivery: Tomorrow</span>
                        <br></br>
                        <span>9:00AM - 1:30PM</span>
                      </p>
                    </Typography>
                    {!(counters[item.index] && counters[item.index][selectedVariants[item.index - 1] || 0]) ? (
                      <div className="addButton">
                        <TextField
                          id={`quantity-${item.index}`}
                          sx={{ m: 1, width: "8ch", marginTop: "0px" }}
                          placeholder="Qty 1"
                          size="small"
                          variant="standard"

                        />
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ color: "#000", background: "#f2cb76" }}
                          onClick={() => incrementCount(item.index)}
                        >
                          ADD
                        </Button>
                      </div>
                    ) : (
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => decrementCount(item.index)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          defaultValue={counters[item.index] && counters[item.index][selectedVariants[item.index] || 0]}
                          value={counters[item.index] && counters[item.index][selectedVariants[item.index] || 0]}
                          className="form-control"
                        />
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => incrementCount(item.index)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <h2 style={{ textAlign: "center" }}>Fruits and Vegetables</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {items.filter(
          (product) => product.category === "Fruits & Vegetables"
        )
          .slice(8, 12)
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="171"
                    width="100"
                    image={item.image}
                    alt="green iguana"
                    sx={{ height: "200px", width: "200px" }}
                    onClick={() => goToRelevantPage(item)}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
      <h2 style={{ textAlign: "center" }}>Beverages</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        {items.slice(10, 16)
          .filter((product) => product.category === "Beverages")
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={2}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                    sx={{ height: "200px", width: "200px" }}
                    onClick={() => goToRelevantPage(item)}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
      <h2 style={{ textAlign: "center" }}>Snack Store</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {items.filter(
          (product) =>
            product.category === "Gourmet & World Food" ||
            product.category === "Snacks & Branded Foods"
        )
          .slice(1, 5)
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                    sx={{ height: "200px", width: "200px" }}
                    onClick={() => goToRelevantPage(item)}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Home;
