import React from "react";

// import Container from "react-bootstrap/Container";
// import Card from "react-bootstrap/Card";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import API from "./utils/API";

class App extends React.Component {
  state = {};

  componentDidMount() {
    API.searchListings("Dover,NH").then(data => {
      console.log({ data });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/group" component={Group} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
