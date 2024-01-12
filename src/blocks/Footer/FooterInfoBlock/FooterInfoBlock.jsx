import { useFooterInfoBlockQuery } from '../../../services/api.js';
import {Link} from "react-router-dom";

export default function FooterInfoBlock() {
    const { data:  footerInfoBlockData } = useFooterInfoBlockQuery();
    return (
        <div className="footer-info-block">
            <div className="footer-info-block__logo">
                <img src={footerInfoBlockData?.field_image?.image_style_uri?.['medium']}
                     alt={footerInfoBlockData?.field_image?.meta?.alt}/>
                <p>{footerInfoBlockData?.data?.field_main_text}</p>
            </div>
            <div className="footer-info-block__contact">
                <Link
                    to={`https://www.google.com/maps/search/${footerInfoBlockData?.data?.field_location}`}>{footerInfoBlockData?.data?.field_location}</Link>
                <div>e-mail:<Link
                    to={`mailto: ${footerInfoBlockData?.data?.field_email}`}>{footerInfoBlockData?.data?.field_email}</Link>
                </div>
            </div>
        </div>
    );
}
