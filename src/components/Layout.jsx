import PropTypes from 'prop-types';
import HeaderMenu from "../blocks/HeaderMenu/HeaderMenu.jsx";
import TopHeader from "../blocks/TopHeader/TopHeader.jsx";
import Footer from "../blocks/Footer/Footer.jsx";

function Layout({ children }) {
    return (
        <>
            <TopHeader/>
            <HeaderMenu/>
            <main className="container">{children}</main>
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;