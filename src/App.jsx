import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";

import NavBar from "./components/NavBar";

import Group from "./pages/Group";
import CreateGroup from "./pages/CreateGroup";
import Groups from "./pages/Groups";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ShareListing from "./pages/ShareListing";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
        <NavBar user={user} updateUser={this.updateUser} />
        <Container className="my-2">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Landing user={user} {...props} />}
            />
            <Route
              exact
              path="/share/:listing_id/:property_id/:price/:address/:photo"
              render={props => <ShareListing user={user} {...props} />}
            />
            <Route
              exact
              path="/group/:id"
              render={props => <Group user={user} {...props} />}
            />
            <Route
              exact
              path="/sign-up"
              render={props => <SignUp user={user} {...props} />}
            />
            <Route
              exact
              path={["/group/edit/:id", "/group/create"]}
              render={props => <CreateGroup user={user} {...props} />}
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
