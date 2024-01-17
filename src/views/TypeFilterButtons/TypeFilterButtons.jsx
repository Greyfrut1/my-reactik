import {useTaxonomyTypeInfoQuery} from "../../services/api.js";
import PropTypes from "prop-types";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import './TypeFilterButtons.scss';

export default function TypeFilterButtons({handleTypeInformation}) {
    const {data: typeData} = useTaxonomyTypeInfoQuery();
    const langPrefix = useLanguagePrefix();

    // Render the TypeFilterButtons component with Clear button and taxonomy term buttons.
    return (
        <div className={"type-filter"}>
            <select
                className={"type-filter__select"}
                onChange={(e) => handleTypeInformation(e.target.value)}
            >
                <option value={"All"}>{(langPrefix === 'en' && "Category") || ("Категорії")}</option>
                {typeData?.data?.map((item, index) => (
                    <option key={index} value={item.attributes.drupal_internal__tid}>
                        {item.attributes.name}
                    </option>
                ))}
            </select>
        </div>

    );
}

TypeFilterButtons.propTypes = {
    handleTypeInformation: PropTypes.func.isRequired,
};
