import ImageComponent from "../components/ImageComponent.jsx";
import useDrupalData from "../services/api.jsx";

function Photoalbums() {
    // Define the API URL as a string
    let apiUrl = '/jsonapi/views/photoalbums_/block_1';

    // Initialize state to hold the fetched data
    const { data: albumsData, isLoading: albumsIsLoading, error: albumsError } = useDrupalData(apiUrl);

    // Fetch data from the Drupal API using the useDrupalData hook
    useDrupalData(apiUrl, (data) => {
        setJsonData(data);
    });
    return (
        <div>
                {albumsData.rows.map((item, index) => (
                <div key={index}>
                    <h2>{item.attributes.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default Photoalbums;