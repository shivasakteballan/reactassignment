import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

export const MapContainer = () => {

    const selectedAddress = useSelector(state => state.location.SelectedLocation)

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    const mapStyles = {  
        top: 20,      
        height: "50vh",
        width: "50%"};

  const [ currentPosition, setCurrentPosition ] = useState({});
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
    useEffect(() => {

    navigator.geolocation.getCurrentPosition(success);
    
    if(selectedAddress){
    Geocode.fromAddress(selectedAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
    const currentPosition = {
        lat: lat,
        lng: lng
      }
    setCurrentPosition(currentPosition);
        },
        (error) => {
        }
      );
    }

    },[selectedAddress])
  
  return (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}>
          {
            currentPosition.lat &&(<Marker position={currentPosition} /> )
         }
         </GoogleMap>
  )
}

export default MapContainer;