import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Products from "../Products.json";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //   const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [counter, setCounter] = useState(0);
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
  const incrementCount = () => {
    console.log(`increment - ${counter}`);
    // Update state with incremented value
    setCounter(counter + 1);
  };

  const decrementCount = () => {
    console.log(`decrement - ${counter}`);
    // Update state with incremented value
    setCounter((c) => Math.max(c - 1, 0));
  };
  const showProductDetails = (item) => {
    
    navigate(`/Product?id=${item.index}`);
  };

  return (
    <div>
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
                <CardContent>
                  <Typography gutterBottom variant="body" component="div">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.product}
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId={`demo-simple-select-label-${i}`}
                      id={`demo-simple-select-${i}`}
                      value={prices[i]}
                      onChange={(e) => handlePrice(e, i)}
                      defaultValue={item.market_price}
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
                    sx={{
                      fontSize: "10px",
                      color: "#333",
                      fontFamily: "ProximaNovaA-Regular",
                      marginBottom: "2px",
                      lineHeight: "15px",
                    }}
                  >
                    <img
                      src="https://www.bbassets.com/static/v2662/custPage/build/content/img/standard-del-gray.svg"
                      width="30px"
                      height="25px"
                      alt="transport"
                    ></img>
                    <span>Standard Delivery: Tomorrow</span>
                    <br></br>
                    <span>9:00AM - 1:30PM</span>
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ color: "#FFFE9D" }}
                  >
                    ADD
                  </Button>
                  <div className="btn-group" role="group">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={decrementCount}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <input
                      type="number"
                      min="1"
                      defaultValue={counter}
                      value={counter}
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={incrementCount}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
