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
  //   const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [counters, setCounters] = useState({});
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((data)=>data);
  
  const [productsInCart, setProductsInCart] = useState(state.data.cartItems || {});
  const chooseVariant = (e) => {
    const value = e.target.value;
    const [index, unit] = value.split('-');
    let existingVariant = selectedVariants;
    existingVariant[index] = Number(unit);
    console.log(existingVariant)
    setSelectedVariants(existingVariant);
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
    const newProductsToCart = JSON.parse(JSON.stringify(productsInCart)); // Create a copy of productsInCart
    
    for (const pIndex in counters) {
      const unit = selectedVariants[pIndex] || 0;
      newProductsToCart[pIndex] = newProductsToCart[pIndex] || {};
      newProductsToCart[pIndex][unit] = {
        quantity: counters[pIndex][unit] || 1
      };
    }
  
    setProductsInCart(newProductsToCart);
    dispatch(UPDATE_ITEMS(newProductsToCart));
  };
  

  const getQuantity = (pIndex) => {
    let unit = selectedVariants[pIndex] || 0;
    return counters[pIndex]?.[unit] || 0;
  }

  const showProductDetails = (item) => {
    navigate(`/Product?id=${item.index}`);
  };
  const goToRelevantPage = (item) => {
    navigate(`/Filter?sub_category=${item.sub_category}`);
  };

  useEffect(() => {
    updateProductsInCart();
  }, [counters]);

  return (
    <div>
      <Box sx={{ overflow: "hidden" }}>
        <img
          src="https://www.bigbasket.com/media/uploads/banner_images/2305152-bbpl-staples_460_Bangalore.jpg"
          alt="banner"
        />
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Products.slice(0, 8).map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="green iguana"
                  sx={{ height: "150px", width: "150px", paddingLeft:'60px',paddingTop:"30px"}}
                  onClick={() => showProductDetails(item)}
                />
               
                <img
                  src="https://www.bbassets.com/static/v2663/custPage/build/content/img/vegicon.svg"
                  alt="veg-icon" style={{paddingLeft:"40px"}}
                ></img>
                
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body"
                    component="div"
                    className="brandName"
                  >
                    {item.brand}
                  </Typography>
                  <Typography
                    variant="body2"
                  
                    className="productName"
                    onClick={() => showProductDetails(item)}
                  >
                    {item.product}
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId={`demo-simple-select-label-${item.index}`}
                      id={`demo-simple-select-${item.index}`}
                      value={prices[i]}
                      onChange={(e) => chooseVariant(e)}
                      defaultValue={`${item.index}-0`}
                      className="dropDownBox"
                    >
                      {item.units.map((unitObj, unitIndex)=>(
                      <MenuItem value={`${item.index}-${unitIndex}`}>
                        {unitObj.unit} - Rs.
                        {item.sale_price * unitObj.multiple} 
                      </MenuItem>))}
                    </Select>
                  </FormControl>
                  <Typography>
                    MRP{" "}
                    <span style={{ textDecoration: "line-through" }}>
                      Rs. {prices[i]}
                    </span>{" "}
                    Rs.{selectedPrices[i]}
                  </Typography>
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
                  {/* counters[item.index] === undefined || counters[item.index][selectedVariants[item.index] || 0] */}
                  {getQuantity(item.index) === 0 ? (
                    <div>
                      <TextField
                        id={`quantity-${item.index}`}
                        sx={{ m: 1, width: "10ch" }}
                        variant="filled"
                        placeholder="1"
                      />
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ color: "#FFFE9D" }}
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
                        defaultValue={counters[item.index][selectedVariants[item.index] || 0]}
                        value={counters[item.index][selectedVariants[item.index] || 0]}
                        className="form-control"
                        onChange={getQuantity(item.index)}
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
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <h2 style={{ textAlign: "center" }}>Fruits and Vegetables</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Products.filter(
          (product) => product.category === "Fruits & Vegetables"
        )
          .slice(8, 12)
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="171"
                    width="229"
                    image={item.image}
                    alt="green iguana"
                    sx={{ height: "150px", width: "150px" }}
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
        {Products.slice(10, 16)
          .filter((product) => product.category === "Beverages")
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={2} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                    sx={{ height: "150px", width: "150px" }}
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
        {Products.filter(
          (product) =>
            product.category === "Gourmet & World Food" ||
            product.category === "Snacks & Branded Foods"
        )
          .slice(1, 5)
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                    sx={{ height: "150px", width: "150px" }}
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
