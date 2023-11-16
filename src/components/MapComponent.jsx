import React, {useState, useEffect} from 'react';
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {
    setDefaults,
    fromAddress,
} from 'react-geocode';
import PropTypes from "prop-types";

// Style for the map container
const containerStyle = {
    width: '400px',
    height: '400px',
};

// Retrieving the Google Maps API key from environment variables
const api = import.meta.env.VITE_API_KEY;

// Functional component for rendering a Google Map based on an address
function MapComponent({address}) {
    // Checking if the Google Maps JavaScript API is loaded
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: api,
    });

    // State variables for the map instance and center coordinates
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);

    // Setting default options for the react-geocode library
    setDefaults({
        key: api,
        language: "en",
        region: "eu",
    });

    // Fetching the coordinates from the provided address and updating the center state
    useEffect(() => {
        fromAddress(address)
            .then(({results}) => {
                const {lat, lng} = results[0].geometry.location;
                setCenter({lat, lng});
            })
            .catch(console.error);
    }, [address]);

    // Callback function for handling map load
    const onLoad = React.useCallback(function callback(map) {
        if (center) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
        }

        setMap(map);
    }, [center]);

    // Callback function for handling map unmount
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // Rendering the GoogleMap component if the API is loaded
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : <></>;
}

MapComponent.propTypes = {
    address: PropTypes.string.isRequired
};

export default React.memo(MapComponent);