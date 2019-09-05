import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";

import NavBar from "./components/NavBar";

import Group from "./pages/Group";
import Groups from "./pages/Groups";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

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
        <Container>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/group" component={Group} />
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
