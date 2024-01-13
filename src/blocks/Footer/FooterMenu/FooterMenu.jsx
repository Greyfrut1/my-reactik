import { useFooterMenuQuery } from '../../../services/api.js';
import { NavLink } from 'react-router-dom';
import './FooterMenu.scss';
import React, {useState} from "react";

export default function FooterMenu() {
    const { data: footerMenuData } = useFooterMenuQuery();
    return (
        <nav className={"footer-menu"}>
            {footerMenuData?.map((item) => (
                <ul key={item?.link?.meta_data?.entity_id}>
                    <li className={"level-one"}>
                        {item?.link?.url ? (
                            item?.link?.options ?
                                <a target={item?.link?.options?.attributes?.target} className={"level-one__link"}
                                   href={item?.link?.url}>{item?.link?.title}</a>
                                :
                                <a className={"level-one__link"} href={item?.link?.url}>{item?.link?.title}</a>
                        ) : (
                            <span className={"level-one__link"}>{item?.link?.title}</span>
                        )}
                    </li>
                    {item?.has_children && (
                        <div className={"second-level"}>
                            {item?.subtree?.map((item2) => (
                                <ul key={item2?.link?.meta_data?.entity_id}>
                                    {item2?.link?.url ? (
                                        item2?.link?.options ?
                                            <li><a target={item2?.link?.options?.attributes?.target}
                                                   className={"second-level__link"}
                                                   href={item2?.link?.url}>{item2?.link?.title}</a>
                                            </li>
                                            :
                                            <li><a className={"second-level__link"}
                                                   href={item2?.link?.url}>{item2?.link?.title}</a>
                                            </li>

                                    ) : (
                                        <li><span className={"second-level__link"}>{item2?.link?.title}</span></li>
                                    )}
                                </ul>
                            ))}
                        </div>
                    )}
                </ul>
            ))}
        </nav>
    );
}
