import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./map.css";

const DisplayMap = ({ chosenCountry }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyDn8lwaGCjJfPlwfnBJZPgjis3ZJwEH46A",
    });

    const defaultCenter = {
        lat: chosenCountry.capitalInfo.latlng[0],
        lng: chosenCountry.capitalInfo.latlng[1],
    };

    return (
        <div className="mapDiv">
            {isLoaded && (
                <GoogleMap
                    mapContainerClassName="map"
                    zoom={6}
                    center={defaultCenter}
                ></GoogleMap>
            )}
        </div>
    );
};

export default DisplayMap;
