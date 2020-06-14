import React from 'react';
import App from './App';

import { 
    BrowserRouter as Router,
    Switch, 
    Route, 
    Link 
} from "react-router-dom";


const SignUpLoginScreen = () => {

    return (
      <Router>
        <div className="signUpPage">
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Link to="/app">APP</Link>
          <Route path="/app">
            <App />
          </Route>
        </div>
      </Router>
    );


}

export default SignUpLoginScreen;
