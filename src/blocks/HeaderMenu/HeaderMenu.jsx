import {useHeaderMenuQuery} from '../../services/api.js';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.scss';
export default function HeaderMenu() {
    const { data: items } = useHeaderMenuQuery();

    return (
        <header className={"main-header-menu"}>
            {items?.map((item) => (
                <ul className={"element-menu"} key={item?.link?.meta_data?.entity_id}>
                    <li className={"level-one"}>
                        {item?.link?.url ? (
                            item?.link?.options ?
                                <NavLink target={item?.link?.options?.attributes?.target} className={"level-one-link"} to={item?.link?.url}>{item?.link?.title}</NavLink>
                                :
                                <NavLink className={"level-one-link"} to={item?.link?.url}>{item?.link?.title}</NavLink>
                            ) : (
                            <span className={"level-one-link"}>{item?.link?.title}</span>
                    )}
                </li>
            {item?.has_children && (
                        <ul className={"second-level"}>
                            {item?.subtree?.map((item2) => (
                                <li className={"second-level-item"} key={item2?.link?.meta_data?.entity_id}>
                                    {item2?.link?.url ? (
                                        item2?.link?.options ?
                                            <NavLink target={item2?.link?.options?.attributes?.target} className={"second-level-link"}
                                               to={item2?.link?.url}>{item2?.link?.title}</NavLink>
                                            :
                                            <NavLink className={"second-level-link"}
                                               to={item2?.link?.url}>{item2?.link?.title}</NavLink>

                                    ) : (
                                        <span className={"second-level-link"}>{item2?.link?.title}</span>
                                    )}
                                    {item2?.has_children && (
                                        <ul className={"third-level"}>
                                            {item2?.subtree?.map((item3) => (
                                                <li className={"third-level-item"} key={item3?.link?.meta_data?.entity_id}>
                                                    {item3?.link?.url ? (
                                                        item3?.link?.options ?
                                                            <NavLink target={item3?.link?.options?.attributes?.target} className={"third-level-link"}
                                                              to={item3?.link?.url}>{item3?.link?.title}</NavLink>
                                                            :
                                                            <NavLink className={"third-level-link"}
                                                               to={item3?.link?.url}>{item3?.link?.title}</NavLink>

                                                    ) : (
                                                        <span className={"third-level-link"}>{item3?.link?.title}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </ul>
            ))}
        </header>
    );
}
