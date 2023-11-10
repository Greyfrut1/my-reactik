import React from "react";

function TypeFilterButtons({ typeData, handleTypeNews }) {
    return (
        <div>
            {typeData?.data?.map((item, index) => (
                <div key={index}>
                    <button onClick={() => handleTypeNews(`${item.attributes.drupal_internal__tid}`)}>
                        {item.attributes.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TypeFilterButtons;
