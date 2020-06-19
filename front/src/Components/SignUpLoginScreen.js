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
                       
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            required
                            defaultValue={inputState.email}
                            onChange={(e) => setInputState({
                                ...inputState, 
                                email: e.target.value 
                            })}
                            name="email"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            required
                            defaultValue={inputState.password}
                            onChange={(e) =>setInputState(
                                {
                                    ...inputState,
                                    password: e.target.value,
                                })}
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
