import PropTypes from 'prop-types';
import Header from '../blocks/Header/Header.jsx';
import Footer from "../blocks/Footer/Footer.jsx";
import {ToastContainer} from "react-toastify";

function Layout({ children }) {
    return (
        <>
           <Header/>
            <main>{children}</main>
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