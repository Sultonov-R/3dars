import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function About() {
  const [product, setProduct] = useState([]);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(1);
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data.attributes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/");
    }
  }, []);

  function handleChangeColor(el, index) {
    setColor(el);
    setActive(index);
  }

  function getData() {
    let data = [];
    if (localStorage.getItem("products")) {
      data = JSON.parse(localStorage.getItem("products"));
    }
    return data;
  }

  function handleClick() {
    if (count <= 0 || !color) {
      alert("You didn't select any color or number");
    } else {
      const fur = {
        id,
        color,
        count,
        image: product.image,
        company: product.company,
        price: product.price,
        title: product.title,
      };
      let products = getData();
      if (products.length) {
        let exist = products.find((el) => {
          return el.id == fur.id && el.color == color;
        });
        let copied = JSON.parse(JSON.stringify(products));
        if (exist?.id) {
          copied = copied.map((el) => {
            if (el.id == id && el.color == color) {
              el.count = Number(el.count);
              el.count += Number(count);
            }
            return el;
          });
        } else {
          copied.push(fur);
        }
        localStorage.setItem("products", JSON.stringify(copied));
      } else {
        products.push(fur);
        localStorage.setItem("products", JSON.stringify(products));
      }
    }
  }

  return (
    <div className="container mt-4 d-flex items-center gap-5">
      <div className="img">
        <img width={500} height={500} src={product.image} alt="" />
      </div>
      <div className="info">
        <h2>{product.title}</h2>
        <h4>{product.company}</h4>
        <h4>${product.price}</h4>
        <p>{product.description}</p>

        {product && product.colors?.length > 0 && (
          <>
            {product.colors.map((el, index) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    handleChangeColor(el, index);
                  }}
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: el,
                    padding: "8px 14px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    marginRight: "10px",
                    border: index == active ? "2px solid black" : "none",
                  }}
                >
                  &nbsp;
                </span>
              );
            })}
          </>
        )}

        <select
          className="form-select mt-4"
          aria-label="Default select example"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button onClick={handleClick} className="btn btn-primary mt-4">
          Add To Bag
        </button>
      </div>
    </div>
  );
}

export default About;
