import {useSocialLinksQuery} from "../services/api.js";
import facebook from "/src/assets/components/SocialLinks/facebook-icon.png"
import twitter from "/src/assets/components/SocialLinks/twitter.png"
import instagram from "/src/assets/components/SocialLinks/instagram.png"
import {Link} from "react-router-dom";

export default function SocialLinks(){
    const {data: socialLinksBlock} = useSocialLinksQuery();
    return <div className={"social-links_block"}>
        <Link target={`_blank`} to={`https://www.facebook.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.facebook?.value}`}><img
            src={facebook} alt="" width={"40"} height={"40"}/></Link>
        <a target={`_blank`} href={`https://www.twitter.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.twitter?.value}`}><img
            src={twitter} alt="" width={"40"} height={"40"}/></a>
        <a target={`_blank`} href={`https://www.instagram.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.instagram?.value}`}><img
            src={instagram} alt="" width={"40"} height={"40"}/></a>
    </div>
}
