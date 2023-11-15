import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from 'react-geocode';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const api = import.meta.env.VITE_API_KEY;

function MapComponent({ address }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: api,
    });

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);

    setDefaults({
        key: api, // Your API key here.
        language: "en", // Default language for responses.
        region: "es", // Default region for responses.
    });

    useEffect(() => {
        fromAddress(address)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                console.log(lat, lng);
                setCenter({ lat, lng });
            })
            .catch(console.error);
    }, [address]);

    // Empty dependency array means this effect runs once when the component mounts
    const onLoad = React.useCallback(function callback(map) {
        if (center) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
        }

        setMap(map);
    }, [center]);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>;
}

// Use React.memo to memoize the component and avoid unnecessary re-renders
export default React.memo(MapComponent);