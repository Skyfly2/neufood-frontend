import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./button.css";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import signin_pic from "./sigin.png";
import logo from "./logo-no-text.png";
import { config } from "../Constants";
import "./about.css";
import { FaGoogle } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import {Tabs, Tab} from "@material-ui/core";

var url = config.url.API_HOME;

const theme = createTheme();

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentError, setCurrentError] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  //google login button functions
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleLogout = () => {
    axios.get(url + "/logout").then((response) => {});
    localStorage.removeItem("loginData"); //remove localstorage data user name.
    localStorage.removeItem("loginID");
    localStorage.removeItem("picture");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    localStorage.removeItem("neufoodAccount");
    setLoginData(null); //empty the localstorage data
    window.location.reload(false);
  };

  const handleLogin = async (e) => {
    setErrorEmail(false);
    setErrorPassword(false);
    if (!email || !password) {
      setErrorEmail(true);
      setErrorPassword(true);
      setCurrentError("Please fill out all required fields");
    }
    let response = await fetch(url + "/authentication/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    if (result.error) {
      switch (result.error) {
        case "user does not exist":
          setErrorEmail(true);
          setCurrentError(
            "This email is not associated with a neufood account"
          );
          break;
        case "wrong password":
          setErrorPassword(true);
          setCurrentError("Incorrect password");
          break;
        default:
          setCurrentError("Internal server error, please try again later");
          break;
      }
    } else {
      localStorage.setItem("loginData", JSON.stringify(result));
      sessionStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("loginID", JSON.stringify(result.id));
      localStorage.setItem("neufoodAccount", true);
      setLoginData(result);
      window.location.reload(false);
    }
  };

  const handleGoogleLogin = async (googleData) => {
    const res = await fetch(url + "/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    localStorage.setItem("loginData", JSON.stringify(data));
    localStorage.setItem("picture", JSON.stringify(data.picture));
    sessionStorage.setItem("token", googleData.tokenId);
    localStorage.setItem("loginID", JSON.stringify(data.id));
    localStorage.setItem("neufoodAccount", false);
    setLoginData(data);
    window.location.reload(false);
  };
  const handleFailure = (response) => {
    alert(response);
  };

  //tab
  const [activeTab, setActiveTab] = useState("first");

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(245, 239, 237)",
      }}
      data-testid="signin-1"
    >
      <Container>
        <img className = "logo-img" src = {logo} 
          style= {{
            position: "absolute",
            top: "10%",
            left: "10%",
            height: "20vh",
            width: "auto",
            borderRadius: "40px",
          }}/>
        {loginData != null && (
        <figcaption className = "pageTitle" 
          style = {{
            top: "15%",
            left: "20%",
            color: "#394032",
            width: "20vw",
            height: "auto",
            position: "absolute",
            fontSize: "52px",
            fontFamily: "Urbanist",
            fontWeight: "300",

          }}>Profile</figcaption>
        )}
      </Container> 
  
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth ="100%" >
          {loginData ? (
            <div style={{ paddingTop: "15%", paddingBottom: "10%" }}>
              <Container 
                style={{
                  width: "60%",
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  marginTop: "-50px",
                }}
              >
                <Card
                  style={{
                    width: "flex",
                    height: "200px",
                    justifyContent: "center",
                    alignContent: "center",
                    flexWrap: "wrap",
                    zIndex: 0,
                    borderRadius: "20px",
                    padding: "30px",
                    fontStyle: "Regular",
                    fontFamily: "Urbanist",
                    backgroundColor: "#D9D9D9",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <div 
                        style={{ 
                          width: "300px",
                          height: "100px",
                          borderRadius: "10px",
                          backgroundColor: "#fff",
                          marginLeft: "120px",
                          alignContent: "center",
                          boxShadow: "0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)"
                        }}>
                      <div
                        class="avatar-big"
                        style={{
                          width: "15rem", 
                          height: "15rem",
                        }}
                      >
                        <img
                          class="avatar-img rounded-circle"
                          referrerpolicy="no-referrer"
                          src={
                            localStorage.neufoodAccount == "true"
                              ? signin_pic
                              : localStorage.getItem("picture").slice(1, -1)
                          }
                          style={{
                            position: "relative",
                            right: "80%",
                            width: "130px",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                      <figcaption
                        style={{
                          color: "rgba(174, 145, 39, 1)",
                          left: "38%",
                          color: "rgb(0, 0, 0)",
                          width: "250px",
                          height: "auto",
                          position: "absolute",
                          fontSize: "10px",
                          alignSelf: "left",
                          fontStyle: "Regular",
                          textAlign: "left",
                          fontFamily: "Urbanist",
                          padding: "10px",
                          marginTop: "20px",
                        }}
                      >
                        <div>
                        <Card.Title>{loginData.name}</Card.Title>
                        <Card.Text style={{ fontSize: "15px" }}>
                          Email: {loginData.email}
                        </Card.Text>
                        {loginData.provider === "google.com" && (
                          <img
                            src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-google-circle-512.png"
                            alt="Google icon"
                            style={{ width: "20px", height: "20px" }}
                          />
                        )}
                      </div>
                      </figcaption>
                    </div>
                  </Card.Body>
                </Card>
              </Container>
              <Container style={{ width: "60%", marginTop: "50px" }}>
              <Tabs activeKey={activeTab} onSelect={handleTabChange}>
              <Tab eventKey="first" 
                  title="Pantries"
                  style={{
                      backgroundColor: 'green',
                      borderTopLeftRadius: '30px',
                      borderTopRightRadius: '30px',
                      marginRight: '3%',
                      marginLeft: '3%',
                      color: 'white'
                  }}>
                  <h2>Content for Tab 1 goes here</h2>
              </Tab>
              <Tab eventKey="second"  
                style={{
                  backgroundColor: 'green',
                  borderTopLeftRadius: '30px',
                  borderTopRightRadius: '30px',
                  }}>
                <h2>Content for Tab 2 goes here</h2>
              </Tab>
            </Tabs>
            <div
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                backgroundColor: "#F1F1F1",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                flexDirection: "column",
                gap: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  border: "3px solid #8B0000",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  padding: "20px",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontFamily: "Urbanist",
                }}
              >
                <p>Recipe Recommendation</p>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  border: "3px solid #8B0000",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  padding: "20px",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontFamily: "Urbanist",
                }}
              >
                <p>Allergies/Diet</p>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                  border: "3px solid #8B0000",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  padding: "20px",
                  textAlign: "left",
                  fontWeight: "bold",
                  fontFamily: "Urbanist",
                }}
              >
                <p>Badges</p>
              </div>
            </div>

            </Container>
              <button
                class="button signin"
                role="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              <CssBaseline />
              
              <Box
                sx={{
                  backgroundColor: "rgb(245, 239, 237)",
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "10%",
                  paddingTop: "8%",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{
                    fontSize: "20px",
                    alignSelf: "auto",
                    fontStyle: "Regular",
                    textAlign: "center",
                    fontFamily: "Urbanist",
                  }}
                >
                  Sign in
                </Typography>
                {currentError && (
                  <Typography component="p" variant="p" color="error">
                    {currentError}
                  </Typography>
                )}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    mt: 1,
                    borderRadius: "20px",
                    border: "2px solid green",
                    padding: "30px",
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email-sign-in"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={
                      (errorEmail && {
                        input: { color: "red" },
                      },
                      {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          borderColor: "brown",
                          borderWidth: "10px",
                        },
                      })
                    }
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    data-testid="password-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        borderColor: "brown",
                        borderWidth: "10px",
                      },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                    id="login-button"
                  >
                    Sign In
                  </Button>
                  <div className="form">
                    {/* Calling to the methods */}
                    <form id="signin-form">
                      {/* Labels and inputs for form data */}
                      <GoogleLogin
                        clientId="172976540503-l9kdlci6rhsaulg741o8of7gfq8s4did.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            role="button"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            id="google-login-button"
                          >
                            Google Sign in
                          </Button>
                        )}
                        buttonText="Login"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                      />
                    </form>
                  </div>
                  <Grid container>
                    <Grid item>
                      <Link
                        href="/signup"
                        variant="body2"
                        sx={{
                          fontFamily: "Urbanist",
                          textAlign: "center",
                          display: "block",
                          mt: 2,
                        }}
                      >
                        {"Don't have an account? Sign up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}