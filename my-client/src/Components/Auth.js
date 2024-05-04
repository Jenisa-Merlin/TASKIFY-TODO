import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  // initializes `cookies` object and `setCookie` function using `useCookies` hook - specifies cookies to be accessed or set (`User` and `AuthToken`) 
  const [cookies, setCookie] = useCookies(['User', 'AuthToken']);
  // using `useState` initializes state variables [authentication form's state, error messages, values of username, password, confirm password]
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // used to toggle b/w login and signup views
  // updates isLogin state, cleares any existing error messages
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  // handle submission of form when user attempts login or sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form fields
    if (username.trim() === "") {
      return setError("Username is required");
    } else if (password.trim() === "") {
      return setError("Password is required");
    } else if (!isLogin && confirmPassword.trim() === "") {
      return setError("Confirm password is required");
    } else if (!isLogin && password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    // send requests to backend API
    try {
      const endpoint = isLogin ? "login" : "signup";
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      // set cookies upon successful authentication
      if (response.ok) {
        setCookie("User", res.user);
        setCookie("AuthToken", res.token);
      } else {
        setError(res.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong");
    }
  };

  // JSX representing authentication form UI
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>
            {isLogin ? "Login to Taskify App" : "Signup to Taskify App"}
          </h2>
          {error && (
            <div
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                paddingInline: 20,
                paddingBlock: 5,
                borderRadius: 5,
              }}
            >
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input type="submit" className="create" />
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin ? "rgb(255, 255, 255)" : "rgb(188, 188, 188)",
            }}
          >
            Sign Up
          </button>
          <button onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin ? "rgb(255, 255, 255)" : "rgb(188, 188, 188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
