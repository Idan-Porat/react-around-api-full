import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Header(props) {

    const { title, email, loggedIn, onLogOut} = props;
    const userEmail = loggedIn ? email : '';
    const navigate = useNavigate();
    const path = useLocation();
    const findPath = (path.pathname === "/signin") ? () => navigate("/signup") : (path.pathname === "/signup")
    ? () => navigate("/signin") : onLogOut;

    return (
        <header className="header">
            <img src={headerLogo} alt="header-logo" className="header__logo" />
            <div className='header__texts-container'>
                <div className='header__text'>{userEmail}</div>
                <button onClick={findPath} className={`header__text ${(path.pathname === '/') && 'header__text-grey'}`}>{title}</button>
            </div>
        </header>
    );
}

export default Header;
