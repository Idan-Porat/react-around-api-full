import { useState } from "react";
import AuthForm from "./AuthForm";
import withRouter from "./withRouter";

function Register(props) {

    const { handleRegisterd, loggedIn } = props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegisterd(email, password);
    }

    return (

        <AuthForm
            title='Sign up'
            changeRouteName="Already a member? Log in here!"
            loggedIn={loggedIn}
            onSubmit={handleSubmit}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            valueEmail={email}
            valuePassword={password}
        />
    )
}

export default withRouter(Register);