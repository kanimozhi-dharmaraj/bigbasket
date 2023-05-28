import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "../Products.json";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField, Typography } from "@mui/material";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ITEMS } from "../Redux/stateSlice";

const Product = () => {
  const [params] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [counters, setCounters] = useState({});
  const [clickedElement, setClickedElement] = useState(null);
  const [marketPrice, setMarketPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedVariantQuantity, setSelectedVariantQuantity] = useState(0);

  useEffect(() => {
    setProduct(
      Products.find((item) => item.index === parseInt(params.get("id")))
    );
  }, [params]);
  useEffect(() => {
    if (product && product.units && product.units.length > 0) {
      const minQuantity = product.units[0].unit;
      const minMarketPrice = product.market_price;
      const minSalePrice = product.sale_price;
      setClickedElement(minQuantity);
      setMarketPrice(minMarketPrice);
      setSalePrice(minSalePrice);
    }
  }, [product]);
  useEffect(() => {
    if (marketPrice && salePrice) {
      const percentage = ((marketPrice - salePrice) / marketPrice) * 100;
      setDiscountPercentage(Math.round(percentage));
    }
  }, [marketPrice, salePrice]);
  const dispatch = useDispatch();
  const state = useSelector((data) => data);

  const [productsInCart, setProductsInCart] = useState(
    state.data.cartItems || {}
  );
  const chooseVariant = (e) => {
    const value = e.target.closest("[data-value]").getAttribute("data-value");
    const [index, unit] = value.split("-");
    let existingVariant = selectedVariants;
    existingVariant[index] = Number(unit);

    if(productsInCart[index][unit] === undefined) {
      setSelectedVariantQuantity(0);
    } else {
      setSelectedVariantQuantity(productsInCart[index][unit]['quantity'])
    }

    setSelectedVariants(existingVariant);
    setClickedElement(product.units[unit].unit);
  };
  const incrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      const selectedVariant = selectedVariants[id] || 0;

      newCounters[id] = newCounters[id] || {};
      newCounters[id][selectedVariant] = (newCounters[id][selectedVariant] || 0) + 1;
      setSelectedVariantQuantity(newCounters[id][selectedVariant]);
      
      return newCounters;
    });
  };

  const decrementCount = (id) => {
    setCounters((prevCounters) => {
      const newCounters = { ...prevCounters };
      const selectedVariant = selectedVariants[id] || 0;

      newCounters[id] = newCounters[id] || {};
      newCounters[id][selectedVariant] = Math.max((newCounters[id][selectedVariant] || 0) - 1, 0);
      setSelectedVariantQuantity(newCounters[id][selectedVariant]);

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
  
    setProductsInCart(newProductsToCart);
    dispatch(UPDATE_ITEMS(newProductsToCart));
  };

  useEffect(() => {
    updateProductsInCart();
  }, [counters]);

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
                <Typography
                  gutterBottom
                  variant="body"
                  component="div"
                  className="brandName"
                >
                  {product.brand}
                </Typography>
                <h1 className="title">
                  {product.brand} {product.product} - {clickedElement}
                </h1>
                <Typography>
                  <div
                    style={{ textDecoration: "line-through" }}
                    className="mrpStyle"
                  >
                    MRP Rs. {marketPrice}
                  </div>{" "}
                  <div className="spStyle"> Price : Rs.{salePrice}</div>
                </Typography>
                <div className="dpStyle">
                  Your Save : {discountPercentage} %
                </div>
                <div className="info">(Inclusive of all taxes)</div>

                {selectedVariantQuantity === 0 ? (
                  <div>
                    <TextField
                      sx={{
                        width: "40px",
                        border: "1px solid #c8c8c8",
                        borderRadius: "3px",
                        textAlign: "center",
                        color: "#666",
                        height: "40px",
                      }}
                      placeholder="1"
                    />
                    <button
                      className="basketBtn"
                      onClick={() => incrementCount(product.index)}
                    >
                      ADD TO BASKET
                    </button>
                    <button className="saveBtn">Save</button>
                  </div>
                ) : (
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => decrementCount(product.index)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      defaultValue={selectedVariantQuantity || 0}
                      value={selectedVariantQuantity || 0}
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => incrementCount(product.index)}
                    >
                      +
                    </button>
                  </div>
                )}
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
                    src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12'%3E%3Cg fill='%238F8F8F' fill-rule='evenodd'%3E%3Cpath d='M16.369 6.024h-2.044c-.11 0-.198-.072-.198-.161V4.97c0-.09.089-.161.198-.161h1.432a.21.21 0 01.174.083l.611.892c.074.107-.022.239-.173.239m1.358.165l-1.273-1.857a.42.42 0 00-.346-.165H13.73c-.219 0-.397.144-.397.321v1.857c0 .178.178.322.397.322h3.65c.303 0 .494-.264.347-.478'/%3E%3Cpath d='M18.8 9.11c0 .097-.086.175-.19.175h-.71a.189.189 0 01-.183-.13c-.251-.817-1.07-1.418-2.039-1.418-.968 0-1.787.6-2.038 1.418a.189.189 0 01-.183.13h-.937c-.104 0-.189-.078-.189-.174V3.189c0-.096.085-.174.19-.174h3.98c.068 0 .13.034.164.088l2.11 3.451a.163.163 0 01.024.085v2.472zm-3.122 1.826c-.752 0-1.361-.56-1.361-1.251 0-.692.61-1.252 1.361-1.252.753 0 1.362.56 1.362 1.252 0 .69-.61 1.251-1.362 1.251zm-4.18-1.825c0 .096-.084.174-.188.174H5.52a.19.19 0 01-.182-.127c-.263-.8-1.072-1.386-2.028-1.386s-1.766.585-2.028 1.386a.19.19 0 01-.182.127h-.08c-.104 0-.189-.078-.189-.174V.939c0-.096.085-.174.19-.174H11.31c.104 0 .189.078.189.174V9.11zM3.31 10.97c-.752 0-1.362-.56-1.362-1.252 0-.691.61-1.252 1.362-1.252.752 0 1.361.56 1.361 1.252s-.61 1.252-1.361 1.252zm16.197-4.639l-2.345-3.835a.385.385 0 00-.33-.178H12.52c-.104 0-.189-.078-.189-.174V.348c0-.192-.17-.348-.378-.348H.378C.17 0 0 .156 0 .348v9.354c0 .192.17.348.378.348h.69c.09 0 .164.056.185.135.228.85 1.063 1.482 2.057 1.482.993 0 1.828-.632 2.056-1.482a.188.188 0 01.184-.135h7.897c.087 0 .162.055.184.132.24.833 1.066 1.45 2.047 1.45.981 0 1.808-.617 2.048-1.45a.188.188 0 01.184-.132h1.267c.21 0 .379-.156.379-.348v-3.2a.326.326 0 00-.049-.17z'/%3E%3C/g%3E%3C/svg%3E"
                    height="20px"
                    width="25px"
                    alt="transport"
                  ></img>
                  <span className="deliveryTime">
                    Standard Delivery: Tomorrow 9:00AM - 1:30PM
                  </span>
                </Typography>
                <div>
                  {product.units && product.units.length > 0
                    ? product.units.map((item, i) => (
                        <div
                          className={`optionBox ${
                            clickedElement === item.unit ? "clickedWeight" : ""
                          }`}
                          data-value={`${product.index}-${i}`}
                          data-sale-price={(
                            product.sale_price * item.multiple
                          ).toFixed(2)}
                          data-market-price={(
                            product.market_price * item.multiple
                          ).toFixed(2)}
                          onClick={(e) => chooseVariant(e)}
                        >
                          <div className="weight">
                            <div>{item.unit}</div>
                          </div>
                          <div className="rate">
                            <div>
                              <span>
                                {" "}
                                Rs.
                                {(product.sale_price * item.multiple).toFixed(
                                  2
                                )}
                              </span>
                              <span style={{ textDecoration: "line-through" }}>
                                Rs.{" "}
                                {(product.market_price * item.multiple).toFixed(
                                  2
                                )}
                              </span>
                              <span>{discountPercentage} %</span>
                            </div>
                          </div>
                          <div className="selectOption"></div>
                        </div>
                      ))
                    : ""}
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
              <h1 className="headingStyle">
                {product.brand} {product.product}
              </h1>
              <Typography>
                <h6 className="subHeading">About the Product</h6>
                <ul className="content">
                  {product.description.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                <h6 className="subHeading">Benefits</h6>
                <ul className="content">
                  {product.benefits.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                <h6 className="subHeading">Storage and Uses</h6>
                <ul className="content">
                  {product.storage_uses.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
                <h6 className="subHeading">Other Product Info</h6>
                <div className="content"> {product.other_product_info}</div>
                <div className="content"> {product.other_product_info}</div>

                <div className="content"> {product.other_product_info}</div>

                <h6 className="subHeading">Variable Weight Policy</h6>
                <div className="content"> {product.variable_weight_policy}</div>
                <div className="content"> {product.variable_weight_policy}</div>

                <div className="content"> {product.variable_weight_policy}</div>
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
