import React from "react";
import AuthForm from "./AuthForm";
import withRouter from "./withRouter";
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
function Register(props) {

    const { handleRegisterd } = props
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const history = useNavigate();
    
    const handleChange = (e) => {
        const { email,  password } = e.target;
        setPassword(password)
        setEmail(email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("work")
        Auth.register(email, password)
            .then((res) => {
                if (res) {
                    history('/signin')
                    handleRegisterd()
                } else {
                    console.log('Somthing went wrong');
                }
            })
            .catch((err) => 
            {
                handleRegisterd()
                console.log(err)
            })
    }



    const { loggedIn } = props;
    return (
        
        <AuthForm
            title='Sign up'
            changeRouteName="Already a member? Log in here!"
            loggedIn={loggedIn}
            onSubmit={handleSubmit}
            onChangeText={handleChange}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
        />
    )
}

export default withRouter(Register);