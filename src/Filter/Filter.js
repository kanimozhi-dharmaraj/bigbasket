import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Products from "../Products.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Filter.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CardActionArea,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputBase,
  MenuItem,
  Select,
  TextField,
  alpha,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const Filter = () => {
  const [prices, setPrices] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [counters, setCounters] = useState({});
  const [brands, setBrands] = useState([]);
  const [filterPrices, setFilterPrices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [params] = useSearchParams();
  const [discountPrices, setDiscountPrices] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //     setProduct(
  //       Products.find((item) => item.sub_category === (params.get("sub_category")))
  //     );
  //   }, [params]);
  // console.log(params.get("sub_category"));
  // console.log(
  //   Products.filter((item) => item.sub_category === params.get("sub_category"))
  // );
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
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const allBrands = [...new Set(Products.map((item) => item.brand))];
  const applyBrand = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    const { value, checked } = e.target;
    if (checked && !brands.includes(value)) {
      setBrands((prevBrands) => [...prevBrands, value]);
    } else if (!checked && brands.includes(value)) {
      const brand = brands.filter((item) => item !== value);
      setBrands(brand);
    }
  };
  const applyPrice = (e) => {
    const { value, checked } = e.target;

    if (checked && !filterPrices.includes(value)) {
      setFilterPrices((prevfilterPrices) => [...prevfilterPrices, value]);
    } else if (!checked && filterPrices.includes(value)) {
      const updatedFilterPrices = filterPrices.filter((item) => item !== value);
      setFilterPrices(updatedFilterPrices);
    }
  };

  function applyPriceFilters(products, selectedFilters) {
    const filteredProducts = [];
    const filterOptions = {
      "pf-1": { operation: "lt", prices: [20] },
      "pf-2": { operation: "between", prices: [21, 50] },
      "pf-3": { operation: "between", prices: [51, 100] },
      "pf-4": { operation: "between", prices: [101, 200] },
      "pf-5": { operation: "between", prices: [201, 500] },
      "pf-6": { operation: "gt", prices: [500] },
    };

    // Iterate over selected filter keys
    for (const key of selectedFilters) {
      const filter = filterOptions[key];

      // Check the operation value
      switch (filter.operation) {
        case "lt": {
          // Filter products with price less than the specified value
          const [maxPrice] = filter.prices;
          const filtered = products.filter(
            (product) => product.sale_price < maxPrice
          );
          filteredProducts.push(...filtered);
          break;
        }
        case "between": {
          // Filter products with price between the specified range
          const [minPrice, maxPrice] = filter.prices;
          const filtered = products.filter(
            (product) =>
              product.sale_price >= minPrice && product.sale_price <= maxPrice
          );
          filteredProducts.push(...filtered);
          break;
        }
        case "gt": {
          // Filter products with price greater than the specified value
          const [minPrice] = filter.prices;
          const filtered = products.filter(
            (product) => product.sale_price > minPrice
          );
          filteredProducts.push(...filtered);
          break;
        }
      }
    }

    return filteredProducts;
  }
  const applyDiscount = (e) => {
    const { value, checked } = e.target;

    if (checked && !discountPrices.includes(value)) {
      setDiscountPrices((prevdiscountPrices) => [...prevdiscountPrices, value]);
    } else if (!checked && discountPrices.includes(value)) {
      const updatedDiscountPrices = discountPrices.filter(
        (item) => item !== value
      );
      setDiscountPrices(updatedDiscountPrices);
    }
  };

  function applyDiscountFilters(products, selectedFilters) {
    const discountedProducts = [];
    const filterOptions = {
      "df-1": { operation: "lt", discount: [5] },
      "df-2": { operation: "between", discount: [5, 10] },
      "df-3": { operation: "between", discount: [10, 15] },
      "df-4": { operation: "between", discount: [15, 20] },
      "df-5": { operation: "between", discount: [20, 25] },
      "df-6": { operation: "gt", discount: [25] },
    };

    for (const key of selectedFilters) {
      const filter = filterOptions[key];

      switch (filter.operation) {
        case "lt": {
          // Filter products with price less than the specified value
          const [maxDiscount] = filter.discount;
          const filtered = products.filter(
            (product) =>
              ((product.market_price - product.sale_price) /
                product.market_price) *
                100 <
              maxDiscount
          );
          console.log(filtered)
          discountedProducts.push(...filtered);
          break;
        }
        case "between": {
          // Filter products with price between the specified range
          const [minDiscount, maxDiscount] = filter.discount;
          const filtered = products.filter(
            (product) =>
              ((product.market_price - product.sale_price) /
                product.market_price) *
                100 >=
                minDiscount &&
              ((product.market_price - product.sale_price) /
                product.market_price) *
                100 <=
                maxDiscount
          );
          discountedProducts.push(...filtered);
          break;
        }
        case "gt": {
          // Filter products with price greater than the specified value
          const [minDiscount] = filter.discount;
          const filtered = products.filter(
            (product) =>
              ((product.market_price - product.sale_price) /
                product.market_price) *
                100 >
              minDiscount
          );
          discountedProducts.push(...filtered);
          break;
        }
      }
    }

    return discountedProducts;
  }

  useEffect(() => {
    let productsAfterFiltered = Products;
    if(params.get("sub_category")) {
      productsAfterFiltered = Products.filter(
        (item) => item.sub_category === params.get("sub_category")
      );
    }
    if (params.get("brands")) {
      const brandValues = params.getAll("brands");
      productsAfterFiltered = productsAfterFiltered.filter((item) =>
        brandValues.includes(item.brand)
      );
    }
    if (params.get("prices")) {
      const prices = params.getAll("prices");
      productsAfterFiltered = applyPriceFilters(productsAfterFiltered, prices);
    }
    if (params.get("discounts")) {
      const discounts = params.getAll("discounts");
      productsAfterFiltered = applyDiscountFilters(productsAfterFiltered, discounts);
    }
    setFilteredProducts(productsAfterFiltered);
  },[])

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <div>
            <h2>Brand</h2>
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
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <FormGroup>
                {allBrands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={<Checkbox />}
                    label={brand}
                    onChange={applyBrand}
                    value={brand}
                    name="brands"
                  />
                ))}
              </FormGroup>
            </div>
          </div>
          <div>
            <h2>Price</h2>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Less than Rs 20"
                onChange={(e) => applyPrice(e)}
                value="pf-1"
                name="price"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs 21 to Rs 50"
                onChange={(e) => applyPrice(e)}
                value="pf-2"
                name="price"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs 51 to Rs 100"
                onChange={(e) => applyPrice(e)}
                value="pf-3"
                name="price"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs 101 to Rs 200"
                onChange={(e) => applyPrice(e)}
                value="pf-4"
                name="price"
              />
              <FormControlLabel
                control={<Checkbox />}
                label=" 201 to Rs 500"
                onChange={(e) => applyPrice(e)}
                value="pf-5"
                name="price"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="More than Rs 501"
                onChange={(e) => applyPrice(e)}
                value="pf-6"
                name="price"
              />
            </FormGroup>
          </div>
          <div>
            <h2>Discount</h2>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Upto 5%"
                onChange={(e) => applyDiscount(e)}
                value="df-1"
                name="discount"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="5% - 10%"
                onChange={(e) => applyDiscount(e)}
                value="df-2"
                name="discount"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="10% - 15%"
                onChange={(e) => applyDiscount(e)}
                value="df-3"
                name="discount"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="15% - 20%"
                onChange={(e) => applyDiscount(e)}
                value="df-4"
                name="discount"
              />

              <FormControlLabel
                control={<Checkbox />}
                label="More than 25%"
                onChange={(e) => applyDiscount(e)}
                value="df-5"
                name="discount"
              />
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
            {filteredProducts
              .map((item, i) => (
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
