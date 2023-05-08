import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import { ClipLoader } from "react-spinners";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state: any) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response?.data) {
      setLoading(false);
    }
    dispatch(setProducts(response?.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products :", products);
  return (
    <>
      {loading ? (
        <div
          className="ui container"
          style={{ marginTop: 100, textAlign: "center" }}
        >
          <ClipLoader color="#36d7b7" />
          <div>please wait while dummy api is loading the data.</div>
        </div>
      ) : (
        <div className="ui grid container">
          <ProductComponent />
        </div>
      )}
    </>
  );
};

export default ProductPage;
