import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Footer from './Footer';
import LoginPopup from './LoginPopup';
import 'reactjs-popup/dist/index.css';
import AuthContext from "../contexts/LoginContext/AuthContext";

const Layout = () => {
    let { isLoggedIn, roleID, login, logout } = useContext(AuthContext);

    return (
        <div className="mainDiv">
            <AuthContext.Provider value={{ isLoggedIn, roleID, login, logout }}>
                <div className="topContainer">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h1>I&G Rental Car</h1>
                    </div>
                    <LoginPopup />
                </div>

                <div className="topnav">
                    <Link to="/Home">Home</Link>
                    {getGuardedLinks()}
                    {(!isLoggedIn || roleID != 1) && <Link to="/Reservation">Reservation</Link>}
                    <Link to="/AboutUs">About Us</Link>
                </div>

                <div className="outletcontainer">
                    <Outlet />
                </div>
                <Footer />
            </AuthContext.Provider>
        </div>
    )

    function getGuardedLinks() {
        if (isLoggedIn) {
            return <>
                {roleID == 1 ? <>
                    <Link to="/OrderList">All Orders</Link></> : ''}
            </>
        } else {
            return "";
        }
    }
};

export default Layout;