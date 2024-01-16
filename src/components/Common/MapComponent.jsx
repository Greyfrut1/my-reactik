import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { fromAddress, setDefaults } from 'react-geocode';
import PropTypes from 'prop-types';
import * as logger from 'react-dom/test-utils';

export default function MapComponent({ address, containerStyle }) {
    const { isLoaded, google } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_KEY,
    });

    const [center, setCenter] = useState(null);

    setDefaults({
        key: import.meta.env.VITE_API_KEY,
        language: 'en',
        region: 'eu',
    });

    // Fetching the coordinates from the provided address and updating the center state.
    useEffect(() => {
        if (isLoaded && address) {
            fromAddress(address)
                .then(({ results }) => {
                    const { lat, lng } = results[0].geometry.location;
                    setCenter({ lat, lng });
                })
                .catch((error) => {
                    logger.error('Error fetching coordinates:', error);
                });
        }
    }, [isLoaded, address]);

    // Callback function for handling map load.
    const onLoad = useCallback(
        function callback(mapInstance) {
            if (center && mapInstance) {
                const bounds = new google.maps.LatLngBounds(center);
                mapInstance.fitBounds(bounds);
            }
        },
        [center, google],
    );

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17} onLoad={onLoad}>
            {center && <Marker position={center} />}
        </GoogleMap>
    ) : null;
}

MapComponent.propTypes = {
    address: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
};