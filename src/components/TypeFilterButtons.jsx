// Import the useDrupalData hook to fetch data from the Drupal API.
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

// Define the TypeFilterButtons component that takes 'handleTypeInformation' as a prop.
function TypeFilterButtons({ handleTypeInformation }) {
    // Fetch data using useDrupalData hook with the endpoint for taxonomy term type information.
    const {data: typeData} = useDrupalData('jsonapi/taxonomy_term/type_information');

    // Render the TypeFilterButtons component with Clear button and taxonomy term buttons.
    return (
        <div>
            {/*
                Render a Clear button with an onClick event to handle the case when 'All' is selected.
                It calls the 'handleTypeInformation' prop with 'All' as an argument.
            */}
            <button onClick={() => handleTypeInformation('All')}>
                Clear
            </button>

            {/*
                Map over the taxonomy term data and render buttons for each term.
                Each button calls the 'handleTypeInformation' prop with the term's ID as an argument.
            */}
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

// PropTypes block to define the expected types for props
TypeFilterButtons.propTypes = {
    handleTypeInformation: PropTypes.func.isRequired,
};

// Export the TypeFilterButtons component for use in other parts of the application.
export default TypeFilterButtons;
