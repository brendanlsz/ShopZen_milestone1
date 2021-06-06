import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../redux/User/user.actions";

import { firestore } from "./../../firebase/utils";
import { fetchCart } from "./../../redux/Cart/cart.actions";

import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Buttons from "./../forms/Button";

import googleLogo from "./../../assets/google-logo.png";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      resetForm();
      firestore
        .doc(`users/${currentUser.id}`)
        .get()
        .then((doc) => {
          console.log(doc);
          if (doc.exists) {
            const cart = doc.data().cart;
            dispatch(fetchCart(cart));
          } else {
            // doc.data() will be undefined in this case
            console.log("No such cart!");
          }
        })
        .catch((err) => {
          console.log("Error getting cart:", err);
        });
      history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const configAuthWrapper = {
    headline: "Log In",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div>
        <p>Key in your details below</p>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Forgot password? Reset it <Link to="/recovery">here</Link>
          </p>
          <div className="form-button mt-3 d-flex justify-content-center">
            <Buttons id="submit" type="submit">
              Login
            </Buttons>
          </div>
          <p className="text-center my-4">Or</p>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-lg btn-outline-dark loginbtn"
              onClick={handleGoogleSignIn}
            >
              <img src={googleLogo} alt="googlelogo"></img>
              Sign in with Google
            </button>
          </div>

          <hr></hr>
          <div className="d-flex justify-content-center">
            <p className="d-flex align-items-center flex-direction: column">
              Don't have an account?
            </p>
          </div>

          <Link to="/registration">
            <Buttons className="btnblock">Register Here</Buttons>
          </Link>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
