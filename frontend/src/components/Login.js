import React from "react";
import withRouter from "./withRouter";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import Auth from "../utils/auth";
function Login(props) {

    const { handleLogin, setToken, email, password, setPassword, setEmail } = props;

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // you'll need to add your login code here 
        if (!email || !password) {
            return;
        }
        return Auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    handleLogin(); // we're updating the state inside App.js 
                    setToken(data.token);
                    navigate('/home');
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <AuthForm
            title='Sign in'
            changeRouteName="Not a member yet? Sign up here!"
            onSubmit={handleSubmit}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
        />
    )
}

export default withRouter(Login);