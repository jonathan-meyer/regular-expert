import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Group from "./pages/Group";
import Groups from "./pages/Groups";
import Landing from "./pages/Landing";
import API from "./utils/API";
import Navbar from "./components/Navbar"
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
        <Navbar />
        <div>
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
