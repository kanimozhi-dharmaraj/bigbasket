import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, FormControl, MenuItem, Select, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

const Home = () => {
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products?skip=14&limit=8"
      );
      const json = await response.json();
      setItems(json["products"]);
      setSelectedPrices(
        json["products"].map((item) =>
          (item.price - (item.price * item.discountPercentage) / 100).toFixed(2)
        )
      );

      console.log(json);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const handlePrice = (e, index) => {
    const itemPrice = e.target.value;
    setPrices((prevPrices) => {
      const newPrices = [...prevPrices];
      newPrices[index] = itemPrice;
      return newPrices;
    });
    setSelectedPrices((prevSelectedPrices) => {
      const newSelectedPrices = [...prevSelectedPrices];
      newSelectedPrices[index] = (
        itemPrice -
        (itemPrice * items[index].discountPercentage) / 100
      ).toFixed(2);
      return newSelectedPrices;
    });
  };

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.images[0]}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="body" component="div">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId={`demo-simple-select-label-${i}`}
                      id={`demo-simple-select-${i}`}
                      value={prices[i]}
                      onChange={(e) => handlePrice(e, i)}
                      defaultValue={item.price}
                    >
                      <MenuItem value={item.price}>
                        1 pc - Rs.
                        {item.price -
                          (
                            (item.price * item.discountPercentage) /
                            100
                          ).toFixed(2)}
                      </MenuItem>
                      <MenuItem value={2 * item.price}>
                        2 pcs - Rs.
                        {(
                          2 *
                          (item.price -
                            (item.price * item.discountPercentage) / 100)
                        ).toFixed(2)}
                      </MenuItem>
                      <MenuItem value={5 * item.price}>
                        5 pcs - Rs.
                        {(
                          5 *
                          (item.price -
                            (item.price * item.discountPercentage) / 100)
                        ).toFixed(2)}
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
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
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
