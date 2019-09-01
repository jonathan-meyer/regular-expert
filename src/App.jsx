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
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios
      .get("/user/")
      .then(response => {
        console.log("Get user response: ", response.data);

        if (response.data.user) {
          console.log(
            "Get User: There is a user saved in the server session: "
          );

          this.setState({
            loggedIn: true,
            username: response.data.user.username
          });
        } else {
          console.log("Get user: no user");

          this.setState({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(err => {
        console.log({ err });

        this.setState({
          loggedIn: false,
          username: null
        });
      });
  }

  render() {
    return (
      <Router>
        <NavBar {...this.state} />
        <Container>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/group" component={Group} />
            <Route exact path="/groups" component={Groups} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
