import { useEffect, useState } from "react";
import Cart from "../Cart";
import "./index.css";
import { BeatLoader } from "react-spinners";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="card-wrapper container d-flex flex-wrap gap-3 justify-content-between">
      {isLoading && <BeatLoader color="#36d7b7" />}

      {
        !isLoading && products.length>0 && products.map((product, index)=>{
          return(
            <Cart key={index} product={product}></Cart>
          )
        })
      }
    </div>
  );
}

export default Products;
