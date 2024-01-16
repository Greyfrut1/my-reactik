import FooterInfoBlock from "./FooterInfoBlock/FooterInfoBlock.jsx";
import FooterMenu from "./FooterMenu/FooterMenu.jsx";
import FooterBottom from "./FooterBottom/FooterBottom.jsx";
import './Footer.scss';

export default function Footer () {

    return (
        <div className="footer">
            <div className="footer-top container">
                <FooterInfoBlock/>
                <FooterMenu/>
            </div>
            <FooterBottom/>
        </div>
    );
};
