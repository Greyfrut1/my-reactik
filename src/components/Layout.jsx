import PropTypes from 'prop-types';
import Header from '../blocks/Header/Header.jsx';
import Footer from "../blocks/Footer/Footer.jsx";
import {useLocation} from "react-router-dom";
import Subscriber from "../blocks/Subscriber/Subscriber.jsx";
import {ToastContainer} from "react-toastify";

function Layout({ children }) {
    const location = useLocation();
    const isUnsubscribePage = location.pathname.startsWith("/simplenews/remove/");
    return (
        <>
           <Header/>
            <main>{children}</main>

            {!isUnsubscribePage && (
                <div className={"footer-top bg-dark"}>
                    <Subscriber/>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;