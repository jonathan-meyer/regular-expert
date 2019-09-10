import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";

import NavBar from "./components/NavBar";

import Auth from "./pages/Auth";
import Group from "./pages/Group";
import CreateEditGroup from "./pages/CreateEditGroup";
import Groups from "./pages/Groups";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ShareListing from "./pages/ShareListing";
import ViewListing from "./pages/ViewListing";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(user) {
    this.setState({ user });
  }

  getUser() {
    axios
      .get("/auth/")
      .then(response => {
        const { user } = response.data;
        this.setState({ user });
      })
      .catch(err => {
        console.log({ err });
        this.setState({ user: null });
      });
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <NavBar user={user} updateuser={this.updateUser} />
        <Container className="my-2">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Landing user={user} {...props} />}
            />
            <Route
              exact
              path={["/listing/:property_id/:listing_id"]}
              render={props => <ViewListing user={user} {...props} />}
            />
            <Route
              exact
              path={["/share/:_id"]}
              render={props => <ShareListing user={user} {...props} />}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Auth
                  login
                  user={user}
                  updateuser={this.updateUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/logout"
              render={props => (
                <Auth
                  logout
                  user={user}
                  updateuser={this.updateUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/sign-up"
              render={props => <SignUp user={user} {...props} />}
            />
            <Route
              exact
              path={["/group/edit/:id", "/group/edit", "/group/create"]}
              render={props => <CreateEditGroup user={user} {...props} />}
            />
            <Route
              exact
              path="/group/:id"
              render={props => <Group user={user} {...props} />}
            />
            <Route
              exact
              path="/groups"
              render={props => <Groups user={user} {...props} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
