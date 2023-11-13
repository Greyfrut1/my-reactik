import useDrupalData from "../services/api.jsx";

function TypeFilterButtons({ handleTypeInformation }) {
    const {data: typeData} = useDrupalData('jsonapi/taxonomy_term/type_information');
    return (
        <div>
            <button onClick={() => handleTypeInformation('All')}>
                Clear
            </button>
            {typeData?.data?.map((item, index) => (
                <div key={index}>
                    <button onClick={() => handleTypeInformation(`${item.attributes.drupal_internal__tid}`)}>
                        {item.attributes.name}
                    </button>
                </div>
            ))}

        </div>
    );
}

export default TypeFilterButtons;
