import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import Geocode from "react-geocode";

const initialState = {
  SuggestedLocations: [],
  SelectedLocation: null,
  CurrentPosition: {lat:0, lng:0}
};

const autoComplete = new window.google.maps.places.AutocompleteService();
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

export const fetchLocations = createAsyncThunk(
    'locations/PlacePredictions',
    async (request) => {
        const response = await autoComplete.getPlacePredictions(request)
        return response.predictions;
    }
  )

export const getCurrentLocation = createAsyncThunk(
    'locations/CurrentPosition',
    async () => {
          const position = await getPosition();
          const CurrentPosition = { lat:position.coords.latitude, lng:position.coords.longitude}
          return CurrentPosition;
    }
)

const getPosition = () => {
  return new Promise((response,reject)=>{
    navigator.geolocation.getCurrentPosition(response,reject);
  })
}

export const setCurrentLocationByGeo = createAsyncThunk(
  'locations/GeoUpdateLocation',
  async (selectedAddress) => {
    const position = await Geocode.fromAddress(selectedAddress)
    const { lat, lng } = position.results[0].geometry.location;
    const CurrentPosition = { lat, lng }
    return CurrentPosition;
  }
)

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateSuggestedLocations: (state, action) => {
        return {
            ...state,
            SuggestedLocations: action.payload,
        } 
      },
    updateSelectedLocation: (state, action) => {
        return {
            ...state,
            SelectedLocation: action.payload,
        } 
      },
  },
    
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      // Add user to the state array
      state.SuggestedLocations = action.payload;
    })
    builder.addCase(getCurrentLocation.fulfilled, (state, action) => {
      // Add user to the state array
      state.CurrentPosition = action.payload;
    })
    builder.addCase(setCurrentLocationByGeo.fulfilled, (state, action) => {
      // Add user to the state array
      state.CurrentPosition = action.payload;
    })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateSuggestedLocations, updateSelectedLocation } = locationSlice.actions

export default locationSlice.reducer