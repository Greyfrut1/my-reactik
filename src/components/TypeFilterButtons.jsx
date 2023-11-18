// Import the useDrupalData hook to fetch data from the Drupal API.
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

// Define the TypeFilterButtons component that takes 'handleTypeInformation' as a prop.
function TypeFilterButtons({ handleTypeInformation }) {
    // Fetch data using useDrupalData hook with the endpoint for taxonomy term type information.
    const {data: typeData} = useDrupalData('jsonapi/taxonomy_term/type_information');

    // Render the TypeFilterButtons component with Clear button and taxonomy term buttons.
    return (
        <div className={"type-filter"}>
            <div className={"type-filter__container"}>
                <h1 className={"type-filter__title"}>CATEGORIES</h1>
                <div className={"type-filter__buttons flex flex-col"}>
                    {/*
                Render a Clear button with an onClick event to handle the case when 'All' is selected.
                It calls the 'handleTypeInformation' prop with 'All' as an argument.
            */}
                    <a className={"type-filter__button type-filter__button--clear"} onClick={() => handleTypeInformation('All')}>
                        Any
                    </a>

                    {/*
                Map over the taxonomy term data and render buttons for each term.
                Each button calls the 'handleTypeInformation' prop with the term's ID as an argument.
            */}
                    {typeData?.data?.map((item, index) => (
                        // <div key={index}>
                        <a className={"type-filter__button"} key={index} onClick={() => handleTypeInformation(`${item.attributes.drupal_internal__tid}`)}>
                            {item.attributes.name}
                        </a>
                        // </div>
                    ))}
                </div>

            </div>
        </div>

    );
}

// PropTypes block to define the expected types for props
TypeFilterButtons.propTypes = {
    handleTypeInformation: PropTypes.func.isRequired,
};

// Export the TypeFilterButtons component for use in other parts of the application.
export default TypeFilterButtons;
