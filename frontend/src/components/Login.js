import { useState } from "react";
import withRouter from "./withRouter";
import AuthForm from "./AuthForm";
function Login(props) {

    const { handleLogin, } = props;
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    }

    return (
        <AuthForm
            title='Sign in'
            changeRouteName="Not a member yet? Sign up here!"
            onSubmit={handleSubmit}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            valueEmail={email}
            valuePassword={password}
        />
    )
}

export default withRouter(Login);