import React, { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "./../../redux/User/user.actions";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import "./styles.scss";

import Logo from "./../../assets/logo-black.png";

import Searchbar from "./../Searchbar/index";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  useEffect(() => {
    setActiveMenu(false);
    console.log(location);
  }, [location]);

  return (
    <header className="header">
      <div className="wrap d-flex justify-content-between">
        <div className="navWrap">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="ShopZen LOGO" />
            </Link>
          </div>
          <nav className={`mainMenu ${activeMenu ? "active" : ""}`}>
            <Searchbar></Searchbar>
          </nav>
        </div>

        <div className="callToActions d-flex">
          <ul>
            {currentUser && [
              <li key={1}>
                <NavLink to="/cart">
                  Your Cart{" "}
                  {totalNumCartItems !== 0 ? (
                    <span>({totalNumCartItems})</span>
                  ) : (
                    ""
                  )}
                  <i className="fas fa-shopping-basket"></i>
                </NavLink>
              </li>,
              <li key={2}>
                <NavLink to="/dashboard">
                  My Account
                  <i className="fas fa-user-circle"></i>
                </NavLink>
              </li>,
              <li key={3}>
                <span onClick={() => signOut()}>
                  LogOut
                  <i className="fas fa-sign-out-alt"></i>
                </span>
              </li>,
            ]}

            {!currentUser && [
              <li key={1} className={"hideOnMobile"}>
                <NavLink to="/registration">Register</NavLink>
              </li>,
              <li key={2}>
                <NavLink to="/login">
                  Login
                  <i className="fas fa-user-circle"></i>
                </NavLink>
              </li>,
            ]}

            <li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
