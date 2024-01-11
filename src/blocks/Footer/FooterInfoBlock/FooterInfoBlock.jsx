import { useFooterInfoBlockQuery } from '../../../services/api.js';
import {Link} from "react-router-dom";

export default function FooterInfoBlock() {
    const { data:  footerInfoBlockData } = useFooterInfoBlockQuery();
    return (
        <div>
            <img src={footerInfoBlockData?.field_image?.image_style_uri?.['actual_news']}
                 alt={footerInfoBlockData?.field_image?.meta?.alt}/>
            <div>{footerInfoBlockData?.data?.field_main_text}</div>
            <Link to={`https://www.google.com/maps/search/${footerInfoBlockData?.data?.field_location}`}>{footerInfoBlockData?.data?.field_location}</Link>
            <div><span>e-mail: </span><Link
                to={`mailto: ${footerInfoBlockData?.data?.field_email}`}>{footerInfoBlockData?.data?.field_email}</Link>
            </div>
        </div>
    );
}
