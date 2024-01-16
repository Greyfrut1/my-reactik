import {useSocialLinksQuery} from "../services/api.js";
import Facebook from '../assets/components/SocialLinks/Facebook.svg';
import Twitter from '../assets/components/SocialLinks/TwitterX.svg';
import Instagram from '../assets/components/SocialLinks/Instagram.svg';
import VideoYoutube from '../assets/components/SocialLinks/YouTube.svg';
import {Link} from "react-router-dom";

export default function SocialLinks(){
    const {data: socialLinksBlock} = useSocialLinksQuery();
    return <div className={"social-links_block"}>
        <Link to={`https://www.facebook.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.facebook?.value}`}><img
            src={Facebook} alt="" width={"35"} height={"35"}/></Link>
        <Link to={`https://www.twitter.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.twitter?.value}`}><img
            src={Twitter} alt="" width={"35"} height={"35"}/></Link>
        <Link to={`https://www.instagram.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.instagram?.value}`}><img
            src={Instagram} alt="" width={"35"} height={"35"}/></Link>
        <Link to={`https://www.youtube.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.youtube?.value}`}><img
            src={VideoYoutube} alt="" width={"35"} height={"35"}/></Link>
    </div>
}
