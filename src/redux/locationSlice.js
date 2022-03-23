import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  SuggestedLocations: [],
  SelectedLocation: ''
};

const autoComplete = new window.google.maps.places.AutocompleteService();

export const fetchLocations = createAsyncThunk(
    'locations/PlacePredictions',
    async (request) => {
        const response = await autoComplete.getPlacePredictions(request)
        return response.predictions;
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
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateSuggestedLocations, updateSelectedLocation } = locationSlice.actions

export default locationSlice.reducer