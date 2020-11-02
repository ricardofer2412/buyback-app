import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase/Firebase";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Richard Casanova</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const classes = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainContainer: {
    marginTop: 100,
  },
  avatar: {},
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {},
  logingButton: {
    backgroundColor: "#33B8FF",
  },
  link: {
    textDecoration: "underline",
    color: "lightblue",
    cursor: "pointer",
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      email: "",
      password: "",
      errorMessege: "",
    };
  }
  goToRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);

        this.setState({
          errorMessage: error.message,
        });
      });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    return (
      <Container style={classes.mainContainer} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email_input"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
              value={this.state.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password_input"
              autoComplete="current-password"
              onChange={this.onChange}
              value={this.state.password}
            />
            {this.state.errorMessage && (
              <Typography style={{ color: "red" }}>
                {this.state.errorMessage}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              id="auth_submit_button"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.logingButton}
              onClick={this.login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
export default Login;
