import { UPDATE_ITEMS } from "../Redux/stateSlice";
const localStorageKey = "productState";
import { useDispatch, useSelector } from "react-redux";

const updateProductsInCart = (productsInCart, counters, selectedVariants) => {
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

export { state, updateProductsInCart }