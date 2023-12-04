import React from 'react';
import useDrupalData from "../services/api.jsx";

function MenuItem({ item, items }) {
    return (
        <div key={item.id}>
            <li>{item.attributes.title}</li>
            {items.map((childItem) => (
                <>
                    {childItem.attributes.parent === item.id && (
                        <MenuItem key={childItem.id} item={childItem} items={items} />
                    )}
                </>
            ))}
        </div>
    );
}

function Menu() {
    const { data: items } = useDrupalData(`jsonapi/menu_items/bottom-header`);
    console.log(items?.data);

    return (
        <div>
            {items?.data?.map((item) => (
                <>
                    {item.attributes.parent.length === 0 && (
                        <MenuItem key={item.id} item={item} items={items?.data} />
                    )}
                </>
            ))}
        </div>
    );
}

export default Menu;
