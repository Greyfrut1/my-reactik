import useDrupalData from "../services/api.jsx";

function Menu() {
    const { data: items } = useDrupalData(`/entity/menu/main-header-menu/tree`);

    return (
        <nav className={"main-menu"}>
            {items?.map((item) => (
                <ul className={"element-menu"} key={item?.link?.meta_data?.entity_id}>
                    <li className={"level-one"}>
                        {item?.link?.url ? (
                            item?.link?.options ?
                                <a target={item?.link?.options?.attributes?.target} className={"level-one-link"} href={item?.link?.url}>{item?.link?.title}</a>
                                :
                                <a className={"level-one-link"} href={item?.link?.url}>{item?.link?.title}</a>
                            ) : (
                            <span className={"level-one-link"}>{item?.link?.title}</span>
                    )}
                </li>
            {item?.has_children && (
                        <div className={"second-level"}>
                            {item?.subtree?.map((item2) => (
                                <ul className={"second-level-item"} key={item2?.link?.meta_data?.entity_id}>
                                    {item2?.link?.url ? (
                                        item2?.link?.options ?
                                            <li><a target={item2?.link?.options?.attributes?.target} className={"second-level-link"}
                                               href={item2?.link?.url}>{item2?.link?.title}</a></li>
                                            :
                                            <li><a className={"second-level-link"}
                                               href={item2?.link?.url}>{item2?.link?.title}</a></li>

                                    ) : (
                                        <li><span className={"second-level-link"}>{item2?.link?.title}</span></li>
                                    )}
                                    {item2?.has_children && (
                                        <ul className={"third-level"}>
                                            {item2?.subtree?.map((item3) => (
                                                <li className={"third-level-item"} key={item3?.link?.meta_data?.entity_id}>
                                                    {item3?.link?.url ? (
                                                        item3?.link?.options ?
                                                            <a target={item3?.link?.options?.attributes?.target} className={"third-level-link"}
                                                               href={item3?.link?.url}>{item3?.link?.title}</a>
                                                            :
                                                            <a className={"third-level-link"}
                                                               href={item3?.link?.url}>{item3?.link?.title}</a>

                                                    ) : (
                                                        <span className={"third-level-link"}>{item3?.link?.title}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
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

export default Menu;
