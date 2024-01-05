import { useFooterMenuQuery } from '../../../services/api.js';
import { NavLink } from 'react-router-dom';
import './FooterMenu.scss';

export default function FooterMenu() {
    const { data: footerMenuData } = useFooterMenuQuery();
    return (
        <ul>
            {footerMenuData?.data?.map((item, index) =>
                <li key={index}><NavLink to={item?.attributes?.url}>{item?.attributes?.title}</NavLink></li>
            )}
        </ul>
    );
}
