import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "../Products.json";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";


const Product = () => {
  const [params] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(1);
  const options = ["Option 1", "Option 2", "Option 3"];

  useEffect(() => {
    setProduct(
      Products.find((item) => item.index === parseInt(params.get("id")))
    );
  }, [params]);

  return (
    <>
    
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {product && (
            <CardMedia
              component="img"
              sx={{ width: 450 }}
              image={product.image}
              alt="product_image"
            />
          )}
          <CardContent sx={{ flex: "1 0 auto" }}>
            {product && (
              <>
                <Typography gutterBottom variant="body" component="div">
                  {product.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.brand} {product.product} - 1pc
                </Typography>
                <Typography>
                  MRP{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    Rs. {product.market_price}
                  </span>{" "}
                  Rs.{product.sale_price}
                </Typography>
                <Typography>Your Save :</Typography>
                <Typography>(Inclusive of all taxes)</Typography>
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
                  <span>Standard Delivery: Tomorrow 9:00AM - 1:30PM</span>
                </Typography>
                <TextField
                  id="outlined-number"
                  value={counter}
                  type="number"
                ></TextField>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ color: "#FFFE9D" }}
                >
                  ADD TO BASKET
                </Button>
                <Button variant="outlined" size="small">
                  SAVE
                </Button>
                <Autocomplete
                  options={options}
                  open={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select an option"
                      variant="outlined"
                    />
                  )}
                />
              </>
            )}
          </CardContent>
        </Box>
      </Card>
      <Card>
      <CardContent>
        {product && (
            <>
  <h1>{product.brand} {product.product}</h1>
  <Typography>
    <h6>About the Product</h6>
    <ul>
      {product.description.split('\n').map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
    <h6>Benefits</h6>
    <ul>
      {product.benefits.split('\n').map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
    <h6>Storage and Uses</h6>
    <ul>
      {product.storage_uses.split('\n').map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
    <h6>Other Product Info</h6>
   
      {product.other_product_info}
      
    
    <h6>Variable Weight Policy</h6>
    
      {product.variable_weight_policy}
  </Typography>
  </>
        )
}
</CardContent>

      </Card>
    </>
  );
};

export default Product;
