import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../App";
function Header() {
  const cartCount = useContext(CartContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar scroll
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li>
              <NavLink to='/'>Products</NavLink>
            </li>
            <li>
              <NavLink to='/cart'>Cart</NavLink>
            </li>
           
            </ul>
            <form className="d-flex">
              <NavLink to='/cart'>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>{cartCount.countCart}</span>
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
