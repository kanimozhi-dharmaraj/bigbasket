import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "../Products.json";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, TextField, Typography } from "@mui/material";
import "./Product.css";

const Product = () => {
  const [params] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(0);
  const [clickedElement,setClickedElement] = useState();

  useEffect(() => {
    setProduct(
      Products.find((item) => item.index === parseInt(params.get("id")))
    );
  }, [params]);
  const incrementCount = () => {
    setCounter(counter + 1);
  };

  const decrementCount = () => {
    setCounter(() => Math.max(counter - 1, 0));
  };
  const handleClickedWeight = (e) =>{
    const clickedWeight = e.target.getAttribute("data-value");
    console.log(clickedWeight)
    setClickedElement(clickedWeight);
  }
  return (
    <>
      <Card>
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
                {counter === 0 ? (
                    <div>
                      <TextField
                        id="quantity"
                        sx={{ m: 1, width: "10ch" }}
                        variant="filled"
                        placeholder="1"
                      />
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ color: "#FFFE9D" }}
                        onClick={() => incrementCount()}
                      >
                        ADD
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className="saveBtn"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => decrementCount()}
                      >
                        -
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
                        onClick={() => incrementCount()}
                      >
                        +
                      </button>
                    </div>
                  )}
                <div>
                  <div className={`optionBox ${clickedElement === '500g' ? 'clickedWeight' : ''}`} data-value="500g" onClick={(e)=>handleClickedWeight(e)}>
                    <div className="weight">
                      <div>500g</div>
                    </div>
                    <div className="rate">
                      <div>
                        <span> Rs.{product.sale_price}</span>
                        <span style={{ textDecoration: "line-through" }}>
                          Rs. {product.market_price}
                        </span>
                        <span>Discount</span>
                      </div>
                    </div>
                    <div className="selectOption"></div>
                  </div>
                  <div className={`optionBox ${clickedElement === '1kg' ? 'clickedWeight' : ''}`} data-value="1kg" onClick={(e)=>handleClickedWeight(e)}>
                    <div className="weight">
                      <div>1kg</div>
                    </div>
                    <div className="rate">
                      <div>
                        <span> Rs.{2*product.sale_price}</span>
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.  {2*product.market_price}
                        </span>
                        <span>Discount</span>
                      </div>
                    </div>
                    <div className="selectOption"></div>
                  </div>
                  <div className={`optionBox ${clickedElement === '2kg' ? 'clickedWeight' : ''}`} data-value="2kg" onClick={(e)=>handleClickedWeight(e)}>
                    <div className="weight">
                      <div>2kg</div>
                    </div>
                    <div className="rate">
                      <div>
                        <span> Rs.{4*product.sale_price}</span>
                        <span style={{ textDecoration: "line-through" }}>
                          Rs. {4*product.market_price}
                        </span>
                        <span>Discount</span>
                      </div>
                    </div>
                    <div className="selectOption"></div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Box>
      </Card>
      <Card>
        <CardContent>
          {product && (
            <>
              <h1>
                {product.brand} {product.product}
              </h1>
              <Typography>
                <h6>About the Product</h6>
                <ul>
                  {product.description.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                <h6>Benefits</h6>
                <ul>
                  {product.benefits.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                <h6>Storage and Uses</h6>
                <ul>
                  {product.storage_uses.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                <h6>Other Product Info</h6>

                {product.other_product_info}

                <h6>Variable Weight Policy</h6>

                {product.variable_weight_policy}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
