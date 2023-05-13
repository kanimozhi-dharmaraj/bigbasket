import React, { useState } from "react";
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

const Home = () => {
  //   const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [counters, setCounters] = useState({});
  const navigate = useNavigate();
  //   const getPosts = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://dummyjson.com/products?skip=14&limit=8"
  //       );
  //       const json = await response.json();
  //       setItems(json["products"]);
  //       setSelectedPrices(
  //         json["products"].map((item) =>
  //           (item.price - (item.price * item.discountPercentage) / 100).toFixed(2)
  //         )
  //       );

  //       console.log(json);
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  //   useEffect(() => {
  //     getPosts();
  //   }, []);
  const handlePrice = (e, index) => {
    const itemPrice = e.target.value;
    setPrices((prevPrices) => {
      const newPrices = [...prevPrices];
      newPrices[index] = itemPrice;
      return newPrices;
    });
    setSelectedPrices((prevSelectedPrices) => {
      const newSelectedPrices = [...prevSelectedPrices];
      newSelectedPrices[index] = e.target.value;
      console.log(newSelectedPrices[index]);
      return newSelectedPrices;
    });
  };
  const incrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      newCounters[id] = (newCounters[id] || 0) + 1;
      return newCounters;
    });
  };

  const decrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      newCounters[id] = Math.max((newCounters[id] || 0) - 1, 0);
      return newCounters;
    });
  };
  const showProductDetails = (item) => {
    navigate(`/Product?id=${item.index}`);
  };
  const goToRelevantPage = (item) =>{
    navigate(`/Filter?sub_category=${item.sub_category}`);
  }

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
                  sx={{ height: "150px", width: "150px" }}
                  onClick={() => showProductDetails(item)}
                />
                 <img src="https://www.bbassets.com/static/v2663/custPage/build/content/img/vegicon.svg"
        alt="veg-icon" ></img>
                <CardContent>
                  <Typography gutterBottom variant="body" component="div" className="brandName">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="productName" onClick={() => showProductDetails(item)}>
                    {item.product}
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId={`demo-simple-select-label-${i}`}
                      id={`demo-simple-select-${i}`}
                      value={prices[i]}
                      onChange={(e) => handlePrice(e, i)}
                      defaultValue={item.market_price}
                      className="dropDownBox"
                    >
                      <MenuItem value={item.market_price}>
                        1 pc - Rs.
                        {item.sale_price}
                      </MenuItem>
                      <MenuItem value={2 * item.market_price}>
                        2 pcs - Rs.
                        {(2 * item.sale_price).toFixed(2)}
                      </MenuItem>
                      <MenuItem value={5 * item.market_price}>
                        5 pcs - Rs.
                        {(5 * item.sale_price).toFixed(2)}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography>
                    MRP{" "}
                    <span style={{ textDecoration: "line-through" }}>
                      Rs. {prices[i]}
                    </span>{" "}
                    Rs.{selectedPrices[i]}
                  </Typography>
                  <Typography
                   className="DeliveryDetail"
                  >
                 
                
                    <img
                      src="https://www.bbassets.com/static/v2662/custPage/build/content/img/standard-del-gray.svg"
                      className="transport"
                      alt="transport"
                    ></img>
            
                    <p className="deliveryTime"><span>Standard Delivery: Tomorrow</span>
                    <br></br>
                <span>9:00AM - 1:30PM</span></p>
                  </Typography>
                  {counters[i] === undefined || 0 ? (
                <div>
                  <TextField
                    id={`quantity-${i}`}
                    sx={{ m: 1, width: "10ch" }}
                    variant="filled"
                    placeholder="1"
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ color: "#FFFE9D" }}
                    onClick={() => incrementCount(i)}
                  >
                    ADD
                  </Button>
                </div>
              ) : (
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => decrementCount(i)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    defaultValue={counters[i]}
                    value={counters[i]}
                    className="form-control"
                  />
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => incrementCount(i)}
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
      <h2 style={{textAlign:"center"}}>Fruits and Vegetables</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        
        {Products.slice(17,21).filter(product => product.category==="Fruits & Vegetables").map((item, i) => (
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
      <h2 style={{textAlign:"center"}}>Beverages</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 2 }}>
        
        {Products.filter(product => product.category==="Beverages").map((item, i) => (
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
      <h2 style={{textAlign:"center"}}>Snack Store</h2>
      <hr></hr>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        
        {Products.slice(22,26).filter(product => product.category==="Snacks & Branded Foods").map((item, i) => (
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
