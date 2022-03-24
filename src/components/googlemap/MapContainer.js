import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { getCurrentLocation, setCurrentLocationByGeo } from '../../redux/locationSlice';

export const MapContainer = () => {

  const mapStyles = {  
    top: 20,      
    height: "50vh",
    width: "50%"
  };

  const selectedAddress = useSelector(state => state.location.SelectedLocation)
  const currentPosition = useSelector(state => state.location.CurrentPosition)
  const dispatch = useDispatch();
  
  useEffect(() => {

    dispatch(getCurrentLocation());
    
  if(selectedAddress){
    dispatch(setCurrentLocationByGeo(selectedAddress));
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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