import { useTopHeaderMenuQuery } from '../../../services/api.js';
import { NavLink } from 'react-router-dom';
import './TopHeaderMenu.scss';

export default function TopHeaderMenu() {
    const { data } = useTopHeaderMenuQuery();
    return (
        <ul className="top-header_menu">
            {data?.data?.map(item => (
                <li key={item?.id}>
                    <NavLink to={item?.attributes?.url}>{item?.attributes?.title}</NavLink>
                </li>
            ))}
        </ul>
    );
}
