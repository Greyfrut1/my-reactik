import PropTypes from 'prop-types';
import Header from '../blocks/Header/Header.jsx';
import Footer from "../blocks/Footer/Footer.jsx";

function Layout({ children }) {
    return (
        <>
           <Header/>
            <main>{children}</main>
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;