import React, { useState } from 'react';
import App from './App';
import axios from 'axios';

import { 
    BrowserRouter as Router,
    Switch, 
    Route, 
    Link 
} from "react-router-dom";

const SignUpLoginScreen = () => {

    const [inputState,setInputState] = useState({
        name:'name',
        email:'hello@gmail.com',
        password:'2afawf2ra2'
    });
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post("http://localhost:5000/auth/reg_log", inputState)
      .then((g) => console.log("success"))
      .catch((err) => console.log(`err -> ${err}`));
    };

    return (
      <Router>
        <div className="signUpPage">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                required
                value={inputState.name}
                onChange={(e) =>
                  setInputState({ ...inputState, name: e.target.value })
                }
                name="name"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                required
                value={inputState.email}
                onChange={(e) =>
                  setInputState({ ...inputState, email: e.target.value })
                }
                name="email"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                required
                value={inputState.password}
                onChange={(e) =>
                  setInputState({
                    ...inputState,
                    password: e.target.value,
                  })
                }
                name="password"
              />
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
