import {createSlice} from '@reduxjs/toolkit';

import {IMovies} from '../app/app.types';
import {EAPP_REDUCERS} from '../app/app.constant';

const initialState: IMovies[] = [];

export const movieSlice = createSlice({
  name: EAPP_REDUCERS.SAVE_MOVIES,
  initialState: initialState,
  reducers: {
    saveMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const movieSliceReducer = movieSlice.reducer;
