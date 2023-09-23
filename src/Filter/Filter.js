import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Products from "../Products.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Filter.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ITEMS } from "../Redux/stateSlice";

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
  const [brandFilters, setBrandFilters] = useState([]);
  const [discountFilters, setDiscountFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchField, setSearchField] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageKey = "productState";

  const dispatch = useDispatch();
  const state = useSelector((data) => data);

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
  const [productsInCart, setProductsInCart] = useState(loadCartItemsFromStorage() || state.data.cartItems || {});

  // useEffect(() => {
  //     setProduct(
  //       Products.find((item) => item.sub_category === (params.get("sub_category")))
  //     );
  //   }, [params]);
  // console.log(params.get("sub_category"));
  // console.log(
  //   Products.filter((item) => item.sub_category === params.get("sub_category"))
  // );
  const chooseVariant = (e) => {
    // 1st {1: 0, 2:3}
    const value = e.target.value;
    const [index, unit] = value.split("-");
    let existingVariant = selectedVariants;
    existingVariant[index] = Number(unit);
    console.log(existingVariant);
    setSelectedVariants(existingVariant);
  };
  const incrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      const selectedVariant = selectedVariants[id] || 0;

      newCounters[id] = newCounters[id] || {};
      newCounters[id][selectedVariant] =
        (newCounters[id][selectedVariant] || 0) + 1;

      return newCounters;
    });
  };

  const decrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      const selectedVariant = selectedVariants[id] || 0;

      newCounters[id] = newCounters[id] || {};
      newCounters[id][selectedVariant] = Math.max(
        (newCounters[id][selectedVariant] || 0) - 1,
        0
      );
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

  const getQuantity = (pIndex) => {
    let unit = selectedVariants[pIndex] || 0;
    return counters[pIndex]?.[unit] || 0;
  };

  const goToRelevantPage = (item) => {
    navigate(`/Filter?sub_category=${item.sub_category}`);
  };

  useEffect(() => {
    updateProductsInCart();
  }, [counters]);
  // const handlePrice = (e, index) => {
  //   const itemPrice = e.target.value;
  //   setPrices((prevPrices) => {
  //     const newPrices = [...prevPrices];
  //     newPrices[index] = itemPrice;
  //     return newPrices;
  //   });
  //   setSelectedPrices((prevSelectedPrices) => {
  //     const newSelectedPrices = [...prevSelectedPrices];
  //     newSelectedPrices[index] = e.target.value;
  //     console.log(newSelectedPrices[index]);
  //     return newSelectedPrices;
  //   });
  // };

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
  function applyPriceFilters(products, priceFilters) {
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
    for (const key of priceFilters) {
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
          console.log(filtered);
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

  const trackChanges = (e) => {
    const { name, checked, value } = e.target;
    let searchString = location.search.substring(1);
    let searchParams = searchString ? searchString.split("&") : [];
    if (name === "brands") {
      if (checked === true) {
        searchParams.push(`brands=${value}`);
      } else {
        searchParams = searchParams.filter((e) => e !== `brands=${value}`);
      }
    }
    if (name === "prices") {
      if (checked === true) {
        searchParams.push(`prices=${value}`);
      } else {
        searchParams = searchParams.filter((e) => e !== `prices=${value}`);
      }
    }
    if (name === "discounts") {
      if (checked === true) {
        searchParams.push(`discounts=${value}`);
      } else {
        searchParams = searchParams.filter((e) => e !== `discounts=${value}`);
      }
    }
    navigate(`/Filter?${searchParams.join("&")}`);
  };

  useEffect(() => {
    let productsAfterFiltered = Products;
    const searchString = location.search.substring(1);
    const params = new URLSearchParams(searchString);

    if (params.get("sub_category")) {
      productsAfterFiltered = Products.filter(
        (item) => item.sub_category === params.get("sub_category")
      );
    }
    if (params.get("brands")) {
      const brandValues = params.getAll("brands");
      productsAfterFiltered = productsAfterFiltered.filter((item) =>
        brandValues.includes(item.brand)
      );
      setBrandFilters(brandValues);
    } else {
      setBrandFilters([]);
    }
    if (params.get("prices")) {
      const prices = params.getAll("prices");
      productsAfterFiltered = applyPriceFilters(productsAfterFiltered, prices);
      setPriceFilters(prices);
    } else {
      setPriceFilters([]);
    }
    if (params.get("discounts")) {
      const discounts = params.getAll("discounts");
      productsAfterFiltered = applyDiscountFilters(
        productsAfterFiltered,
        discounts
      );
      setDiscountFilters(discounts);
    } else {
      setDiscountFilters([]);
    }
    console.log(productsAfterFiltered);
    setFilteredProducts(productsAfterFiltered);
  }, [location.search]);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    if (searchText.length > 0) {
      const filteredBrands = allBrands.filter((brand) =>
        brand.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchField(filteredBrands);

      // Filter products based on search text
      const filteredProducts = Products.filter((product) =>
        product.brand.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    } else {
      setSearchField("");
      setFilteredProducts(Products);
    }
  };

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
                onChange={handleSearchChange}
                value={searchField}
              />
            </Search>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <FormGroup>
                {(searchField.length > 0 ? searchField : allBrands).map(
                  (brand) => (
                    <FormControlLabel
                      key={brand}
                      control={<Checkbox />}
                      label={brand}
                      onChange={trackChanges}
                      checked={brandFilters.includes(brand)}
                      value={brand}
                      name="brands"
                    />
                  )
                )}
              </FormGroup>
            </div>
          </div>
          <div>
            <h2>Price</h2>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Less than Rs 20"
                onChange={trackChanges}
                checked={priceFilters.includes("pf-1")}
                value="pf-1"
                name="prices"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs 21 to Rs 50"
                onChange={trackChanges}
                checked={priceFilters.includes("pf-2")}
                value="pf-2"
                name="prices"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs 51 to Rs 100"
                onChange={trackChanges}
                checked={priceFilters.includes("pf-3")}
                value="pf-3"
                name="prices"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Rs 101 to Rs 200"
                onChange={trackChanges}
                checked={priceFilters.includes("pf-4")}
                value="pf-4"
                name="prices"
              />
              <FormControlLabel
                control={<Checkbox />}
                label=" 201 to Rs 500"
                onChange={trackChanges}
                checked={priceFilters.includes("pf-5")}
                value="pf-5"
                name="prices"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="More than Rs 501"
                onChange={trackChanges}
                checked={priceFilters.includes("pf-6")}
                value="pf-6"
                name="prices"
              />
            </FormGroup>
          </div>
          <div>
            <h2>Discount</h2>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Upto 5%"
                onChange={trackChanges}
                checked={discountFilters.includes("df-1")}
                value="df-1"
                name="discounts"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="5% - 10%"
                onChange={trackChanges}
                checked={discountFilters.includes("df-2")}
                value="df-2"
                name="discounts"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="10% - 15%"
                onChange={trackChanges}
                checked={discountFilters.includes("df-3")}
                value="df-3"
                name="discounts"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="15% - 20%"
                onChange={trackChanges}
                checked={discountFilters.includes("df-4")}
                value="df-4"
                name="discounts"
              />

              <FormControlLabel
                control={<Checkbox />}
                label="More than 25%"
                onChange={trackChanges}
                checked={discountFilters.includes("df-5")}
                value="df-5"
                name="discounts"
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
            {filteredProducts.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt="green iguana"
                      sx={{ height: "150px", width: "200px" }}
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
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="productName"
                        onClick={() => showProductDetails(item)}
                      >
                        {item.product}
                      </Typography>
                      {item.units && item.units.length > 0 ? (
                        <FormControl fullWidth>
                          <Select
                            labelId={`demo-simple-select-label-${item.index}`}
                            id={`demo-simple-select-${item.index}`}
                            value={prices[i]}
                            onChange={(e) => chooseVariant(e)}
                            defaultValue={`${item.index}-0`}
                          >
                            {item.units.map((unitObj, unitIndex) => (
                              <MenuItem
                                value={`${item.index}-${unitIndex}`}
                                key={unitIndex}
                              >
                                {unitObj.unit} - Rs.{" "}
                                {item.sale_price * unitObj.multiple}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        ""
                      )}

                      <Typography>
                        MRP{" "}
                        <span style={{ textDecoration: "line-through" }}>
                          Rs. {item.market_price}
                        </span>{" "}
                        Rs.{item.sale_price}
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
                            sx={{ m: 1, width: "10ch" ,margin: "0.5rem"}}
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
                            defaultValue={
                              counters[item.index][
                                selectedVariants[item.index] || 0
                              ]
                            }
                            value={
                              counters[item.index][
                                selectedVariants[item.index] || 0
                              ]
                            }
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
          
        </div>
      </div>
    </>
  );
};

export default Filter;
