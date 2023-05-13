import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Products from "../Products.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
const Filter = () => {
  const [prices, setPrices] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [counters, setCounters] = useState({});

  const [params] = useSearchParams();
  
  const navigate = useNavigate();

  // useEffect(() => {
  //     setProduct(
  //       Products.find((item) => item.sub_category === (params.get("sub_category")))
  //     );
  //   }, [params]);
  console.log(params.get("sub_category"));
  console.log(
    Products.filter((item) => item.sub_category === params.get("sub_category"))
  );
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
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <div>
            <h2>Brand</h2>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Fresho" />
              <FormControlLabel control={<Checkbox />} label="Organic" />
            </FormGroup>
          </div>
          <div>
            <h2>Price</h2>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Less than Rs 20" />
              <FormControlLabel control={<Checkbox />} label="Rs 21 to Rs 50" />
              <FormControlLabel control={<Checkbox />} label="Rs 51 to Rs 100" />
              <FormControlLabel control={<Checkbox />} label="Rs 101 to Rs 200" />
              <FormControlLabel control={<Checkbox />} label=" 201 to Rs 500" />
              <FormControlLabel control={<Checkbox />} label="More than Rs 501" />
            </FormGroup>
          </div>
          <div>
            <h2>Discount</h2>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Upto 5%" />
              <FormControlLabel control={<Checkbox />} label="15% - 25%" />
              <FormControlLabel control={<Checkbox />} label="More than 25%" />
              
            </FormGroup>
          </div>
        </div>
        <div>
          <h2>
            <img
              src="https://www.bbassets.com/static/v2662/custPage/build/content/img/standard-del-gray.svg"
              width="30px"
              height="25px"
              alt="transport"
            ></img>
            {params.get("sub_category")}
          </h2>
          <hr></hr>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {Products.filter(
              (item) => item.sub_category === params.get("sub_category")
            ).map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt="green iguana"
                      sx={{ height: "150px", width: "150px" }}
                      onClick={() => showProductDetails(item)}
                    />
                    <img
                      src="https://www.bbassets.com/static/v2663/custPage/build/content/img/vegicon.svg"
                      alt="veg-icon"
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
        </div>
      </div>
    </>
  );
};

export default Filter;
