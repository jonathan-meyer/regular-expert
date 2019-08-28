import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Group from "./pages/Group";
import Groups from "./pages/Groups";
import Landing from "./pages/Landing";

import Navbar from "./components/Navbar";

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
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/group" component={Group} />
            <Route exact path="/groups" component={Groups} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
