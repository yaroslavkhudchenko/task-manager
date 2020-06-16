import React, { useState, useEffect } from 'react';
/* import App from './App';
 */import axios from 'axios';


const SignUpLoginScreen = () => {

    const [loggedin, setloggedin] = useState(false);

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
            .then((res) => setloggedin(true))
            .catch((err) => console.log(`err -> ${err}`));
    };

    useEffect(()=>{

        console.log('here am I')


    })
    return (
        <div className="signUpPage">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        required
                        defaultValue={inputState.name}
                        onChange={(e) => setInputState({
                            ...inputState, name: e.target.value
                        })}
                        name="name"
                    />
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
            {/* <Link to="/app">APP</Link>
            <Route path="/app">
                <App />
            </Route>
                        {loggedin && <Redirect push to="/app" /> } */}
        </div>
    );


}

export default SignUpLoginScreen;
