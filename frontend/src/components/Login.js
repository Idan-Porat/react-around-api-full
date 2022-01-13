import React from "react";
import withRouter from "./withRouter";
import AuthForm from "./AuthForm";
function Login(props) {

    const { handleLogin, email, password, setPassword, setEmail } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
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